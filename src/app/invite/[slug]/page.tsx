"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const PHOTOS = [
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868227/1_xrmtuz.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868228/2_s2hwqk.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773161932/4_1_dx0yib.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868228/3_kcjeia.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868227/5_jx44zg.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868227/6_wztgv2.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868227/7_byha4k.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868226/8_ya2pky.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773161913/9_1_ljvu9k.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772868225/9_zugtii.jpg",
];

const MUSIC_URL =
  "https://res.cloudinary.com/dpxx4z2on/video/upload/v1772117861/a_thousand_years_s3mzt9.mp3";

export default function WeddingCardPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleFirstInteraction = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const play = () => {
      handleFirstInteraction();
      document.removeEventListener("click", play);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("keydown", play);
    };
    document.addEventListener("click", play, { once: true });
    document.addEventListener("touchstart", play, { once: true });
    document.addEventListener("keydown", play, { once: true });
    return () => {
      document.removeEventListener("click", play);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("keydown", play);
    };
  }, [handleFirstInteraction]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-start relative">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 p-4">
        {PHOTOS.map((src, index) => (
          <div key={src} className="w-full relative">
            <Image
              src={src}
              alt={`Wedding photo ${index + 1}`}
              width={1080}
              height={1920}
              className="w-full h-auto object-contain"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

