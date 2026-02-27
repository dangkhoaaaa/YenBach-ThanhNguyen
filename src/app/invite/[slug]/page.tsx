"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PHOTOS = [
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772207777/z7570918792883_5621d56f7f43da5938ce79b03853e62f_smk8on.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772207776/z7570783555454_22b1cf9bac8a26dc14cd32099080250f_kirilb.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772207777/z7570829125601_4c1df425d1d7f5564206c322f180efc8_jbpqro.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772207776/z7570868697626_007b2e154da2015ba876d2717f05f8d0_qlxhcc.jpg",
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

    // Tự play ngay lần đầu nếu được browser cho phép
    audio.play().catch(() => {
      // ignore autoplay errors
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

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

