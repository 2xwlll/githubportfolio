"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    const recordClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.hostname === "github.com") track("github_link", { repository: url.pathname.split("/").filter(Boolean).slice(0, 2).join("/") || "profile" });
      if (url.pathname.endsWith(".pdf")) track("pdf_open", { document: url.pathname.split("/").at(-1) ?? "pdf" });
    };
    document.addEventListener("click", recordClick);
    return () => document.removeEventListener("click", recordClick);
  }, []);
  return null;
}
