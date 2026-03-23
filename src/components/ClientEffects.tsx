"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reveals = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            const kids = e.target.querySelectorAll(
              ".incl-card,.addon-card,.cabin-card,.review-card,.gallery-item,.thermal-item,.region-point,.press-logo"
            );
            kids.forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 80}ms`;
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach((el) => obs.observe(el));

    const anchors = document.querySelectorAll('a[href^="#"]');
    const onAnchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href");
      if (id && id.length > 1) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    anchors.forEach((a) => a.addEventListener("click", onAnchorClick));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      anchors.forEach((a) =>
        a.removeEventListener("click", onAnchorClick)
      );
    };
  }, []);

  return null;
}
