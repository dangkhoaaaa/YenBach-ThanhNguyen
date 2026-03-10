"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { InviteQr } from "@/app/components/InviteQr";

const PHOTOS = [
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/1_jhpokn.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/2_ujlysk.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/3_zt72xs.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/4_iro5eb.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/5_avrlzf.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160337/6_nkdgiy.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160337/7_lbwkun.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160337/8_kpwb5y.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160337/9_uiwh7r.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1773160336/10_oowbnc.jpg",
];

const MUSIC_URL =
  "https://res.cloudinary.com/dpxx4z2on/video/upload/v1772117861/a_thousand_years_s3mzt9.mp3";

export default function WeddingKhamKhaoPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audioRef.current = audio;

    setCurrentUrl(window.location.href);

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

      {currentUrl && (
        <div className="w-full mt-4 flex justify-center bg-black py-6">
          <InviteQr value={currentUrl} />
        </div>
      )}
    </main>
  );
}

