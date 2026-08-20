import { ImageResponse } from "next/og";

export const alt = "William Eric Olson — Astrophysics and AI Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", color: "white", background: "radial-gradient(circle at 78% 20%, #155e75 0%, #020617 43%, #020617 100%)", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#67e8f9", fontSize: 24, letterSpacing: 5, textTransform: "uppercase" }}><span style={{ width: 60, height: 2, background: "#22d3ee" }} />Astrophysics · machine learning</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 82, fontWeight: 900, letterSpacing: -4 }}>William Eric Olson</div><div style={{ marginTop: 28, maxWidth: 900, fontSize: 34, lineHeight: 1.3, color: "#cbd5e1" }}>AGN ionization cones, radio technosignatures, and reproducible astronomical analysis.</div></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#94a3b8" }}><span>University of Texas at San Antonio</span><span>2xwlll · GitHub</span></div></div>, size);
}
