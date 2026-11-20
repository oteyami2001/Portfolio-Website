import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Cloud Engineer, Cloud Solutions Architect and Oracle DBA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72,
          background: "radial-gradient(900px 500px at 10% 0%, rgba(47,107,255,0.45), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(53,200,232,0.35), transparent 60%), #050A14",
          color: "#E8EEF8", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#7FE3F5", letterSpacing: 4 }}>
          <div style={{ width: 48, height: 2, background: "#35C8E8" }} />
          CLOUD ENGINEER · SOLUTIONS ARCHITECT · ORACLE DBA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#fff" }}>{profile.name}</div>
          <div style={{ fontSize: 36, marginTop: 20, color: "#B6C2D9" }}>Engineering secure, scalable and intelligent cloud infrastructure.</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {["AWS", "OCI", "Azure", "Terraform", "Oracle DB", "Security+"].map((t) => (
            <div key={t} style={{ padding: "8px 20px", borderRadius: 999, border: "1px solid rgba(127,227,245,0.35)", background: "rgba(53,200,232,0.08)" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
