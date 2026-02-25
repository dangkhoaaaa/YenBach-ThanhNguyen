'use client';

import type { ReactNode } from "react";

type AnimatedTextProps = {
  children: ReactNode;
  animationType?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale";
  delay?: number;
};

export function AnimatedText({
  children,
  animationType = "fadeIn",
  delay = 0,
}: AnimatedTextProps) {
  const base = "inline-block transition-all duration-700";
  const map: Record<string, string> = {
    fadeIn: "opacity-0 animate-fadeIn",
    slideUp: "opacity-0 translate-y-4 animate-slideUp",
    slideLeft: "opacity-0 -translate-x-4 animate-slideLeft",
    slideRight: "opacity-0 translate-x-4 animate-slideRight",
    scale: "opacity-0 scale-95 animate-scaleIn",
  };

  return (
    <span
      style={{ animationDelay: `${delay}ms` }}
      className={`${base} ${map[animationType] || map.fadeIn}`}
    >
      {children}
    </span>
  );
}

