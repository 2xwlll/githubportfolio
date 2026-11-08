"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!video || connection?.saveData) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let ready = false;
    let timer: number | undefined;
    let idleCallback: number | undefined;

    const updatePlayback = () => {
      if (ready && inView && !document.hidden && !reducedMotion.matches) {
        // Keep the static poster until the initial page load has finished.
        if (!video.getAttribute("src")) video.src = "/images/gifs/black-hole.webm";
        void video.play().catch(() => { /* The poster remains when autoplay is unavailable. */ });
      } else {
        video.pause();
      }
    };

    const startWhenIdle = () => {
      timer = window.setTimeout(() => {
        const start = () => { ready = true; updatePlayback(); };
        if ("requestIdleCallback" in window) {
          idleCallback = window.requestIdleCallback(start, { timeout: 2000 });
        } else {
          start();
        }
      }, 1000);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    if (document.readyState === "complete") startWhenIdle();
    else window.addEventListener("load", startWhenIdle, { once: true });

    return () => {
      window.removeEventListener("load", startWhenIdle);
      window.clearTimeout(timer);
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback);
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      observer.disconnect();
      video.pause();
    };
  }, []);

  return <video ref={videoRef} loop muted playsInline preload="none" poster="/images/general/black-hole-poster.webp" width={1040} height={600} className="h-full w-full object-contain" />;
}
