'use client';

import type { ReactNode } from "react";

type AnimatedImageProps = {
  children: ReactNode;
  animationType?: "scale" | "zoomIn";
  delay?: number;
};

export function AnimatedImage({
  children,
  animationType = "scale",
  delay = 0,
}: AnimatedImageProps) {
  const base = "block transition-all duration-700";
  const map: Record<string, string> = {
    scale: "opacity-0 scale-95 animate-scaleIn",
    zoomIn: "opacity-0 scale-90 animate-zoomIn",
  };

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`${base} ${map[animationType] || map.scale}`}
    >
      {children}
    </div>
  );
}

