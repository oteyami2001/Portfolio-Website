import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledge } from "@/lib/knowledge";
import { answerFromFaq } from "@/lib/faq";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

const MAX_MESSAGES = 12;
const MAX_CHARS = 1200;
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes per IP (best effort, per instance)
const hits = new Map<string, { count: number; reset: number }>();

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the portfolio assistant on the personal website of ${profile.name}, a cloud engineer. Recruiters and hiring managers ask you about his background.

Answer only from the portfolio knowledge below. If something is not covered (for example salary, references, or topics unrelated to his professional profile), say you don't have that information and suggest using the Contact page or LinkedIn. Never invent employers, dates, metrics, clients or credentials. Where a project is academic or a reference design, say so as the knowledge does.

Refer to him as Thierry, in the third person. Keep answers concise: two to five sentences or a short list, in plain text without Markdown headings. Mention a relevant page (such as /projects/<slug>, /certifications, /resume or /contact) when it helps.

<portfolio_knowledge>
${buildKnowledge()}
</portfolio_knowledge>`;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function sanitize(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role, content: text });
  }
  while (out.length && out[0].role !== "user") out.shift();
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (rateLimited(ip)) return json({ error: "Too many questions — please try again in a few minutes." }, 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const messages = sanitize(body);
  if (!messages) return json({ error: "Invalid request." }, 400);
  const question = messages[messages.length - 1].content;

  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ mode: "faq", answer: answerFromFaq(question) });
  }

  try {
    const client = new Anthropic();
    const stream = client.beta.messages.stream({
      model: "claude-opus-5-5",
      max_tokens: 2048,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        let sent = false;
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              sent = true;
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          if (!sent || final.stop_reason === "refusal") {
            controller.enqueue(encoder.encode(answerFromFaq(question)));
          }
        } catch (err) {
          console.error("assistant stream error", err instanceof Error ? err.message : err);
          if (!sent) controller.enqueue(encoder.encode(answerFromFaq(question)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-assistant-mode": "ai" },
    });
  } catch (err) {
    console.error("assistant error", err instanceof Error ? err.message : err);
    return json({ mode: "faq", answer: answerFromFaq(question) });
  }
}
