// Renders the /resume page to public/resume/Thierry-Oteyami-Resume.pdf.
// Usage: start the site (npm run build && npm start), then: node scripts/generate-resume-pdf.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: "public/resume/Thierry-Oteyami-Resume.pdf",
  format: "Letter",
  printBackground: true,
  margin: { top: "0.5in", bottom: "0.5in", left: "0.55in", right: "0.55in" },
});
await browser.close();
console.log("Wrote public/resume/Thierry-Oteyami-Resume.pdf");
