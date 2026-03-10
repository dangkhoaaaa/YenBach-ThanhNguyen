"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112158/z7567169126159_68296b7e006f8c014435f4b7b3943eb5_pneq0c.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169128054_8b35b7ec9801dceedd954ae49ef8ad8b_i9pfz7.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169188825_356531c2c57f3faa8d45ea4c7210220f_ul30yt.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169192058_51297eb938ce52143fec8533634538c2_gr1fgm.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169081707_efaba247a3151e426376a84475311cfd_oa9c6o.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169112752_a6bd4cffd4ed597638980efe302a663d_oae40l.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169124980_53b5adaf300267f2da9cf5ce31a7bd64_llvbc8.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169196323_3b4702c186d3b16047fb5562e0b16385_loml2q.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169166520_5423718d4df10eafbbe023e19a97f7b3_bno4rs.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169166520_5423718d4df10eafbbe023e19a97f7b3_bno4rs.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169094888_93f073910301111ac7b1a451a1103300_it4uks.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169045289_539fa59b656f30478cd722c4f1caead4_exwkx1.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169184298_aa4d6cec82f5eacf4daecf535b727ed3_sx26nl.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169173521_c19a90417e6ba86df811cee24c098c63_efokkd.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112164/z7567169166281_a251abc992e52c995a57bd08b362d0e5_tgiajr.jpg",
];

const TOTAL = PHOTOS.length;

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLDivElement[]>([]);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const touchYRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const planes = planesRef.current;
    if (!planes.length) return;

    const DEPTH = isMobile ? 380 : 320;
    const cycle = TOTAL * DEPTH;
    const xOffset = isMobile ? 300 : 260;
    const yOffset = isMobile ? 110 : 90;

    const AUTO_SPEED = 1;

    function animate() {
      const scroll = scrollRef.current;
      const target = targetScrollRef.current;

      // AUTO SCROLL
      targetScrollRef.current += AUTO_SPEED;

      scrollRef.current += (target - scroll) * 0.08;

      let s = scrollRef.current;
      const targetVal = targetScrollRef.current;

      // LOOP INFINITE
      if (s >= cycle || targetVal >= cycle) {
        const n = Math.floor(Math.max(s, targetVal) / cycle);
        scrollRef.current = s - n * cycle;
        targetScrollRef.current = targetVal - n * cycle;
      } else if (s < 0 || targetVal < 0) {
        const n = Math.floor(Math.min(s, targetVal) / cycle);
        scrollRef.current = s - n * cycle;
        targetScrollRef.current = targetVal - n * cycle;
      }

      s = scrollRef.current;

      planes.forEach((plane, i) => {
        if (!plane) return;

        let z = i * DEPTH - s;
        z = (z + cycle) % cycle;

        const x = i * xOffset - s;
        const y = i * yOffset - s * 0.25;

        plane.style.transform = `translate3d(${x}px,${-y}px,${-z}px) rotateY(-50deg)`;

        const brightness = Math.max(0.35, 1 - z / cycle);
        plane.style.filter = `brightness(${brightness})`;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollRef.current += e.deltaY * 0.8;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) touchYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && touchYRef.current != null) {
        const y = e.touches[0].clientY;
        targetScrollRef.current += (touchYRef.current - y) * 0.8;
        touchYRef.current = y;
      }
    };

    const handleTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* HEADER */}
      <div className="absolute top-6 left-6 md:top-20 md:left-20 z-[100] text-white">
        <div className="text-3xl md:text-6xl font-bold leading-tight">
          YÊN BÁCH
        </div>
        <div className="text-3xl md:text-6xl font-bold leading-tight">
          & THANH NGUYÊN
        </div>
      </div>

      {/* GALLERY */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "2200px" }}
      >
        <div
          ref={containerRef}
          className="relative min-w-[200px] min-h-[300px] md:min-w-[400px] md:min-h-[400px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) planesRef.current[i] = el;
              }}
              className="absolute w-[min(380px,92vw)] h-[min(480px,120vw)] md:w-[420px] md:h-[520px] cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 40px 80px rgba(0,0,0,.6)",
              }}
            >
              <Image
                src={src}
                alt={`Wedding photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 420px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HINT */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-2 z-[100]">
        <span className="text-white text-xs tracking-[2px]">
          SCROLL TO SURF
        </span>
        <a
          href="/"
          className="text-white/70 text-xs hover:text-white underline"
        >
          ← Về trang chủ
        </a>
      </div>
    </div>
  );
}