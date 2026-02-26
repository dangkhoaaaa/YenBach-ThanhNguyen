'use client';

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { TEMPLATE2_DECORATIVE_IMAGES } from "@/app/templates/template2/constants";
import { AnimatedText } from "@/app/templates/template2/components/AnimatedText";
import { AnimatedImage } from "@/app/templates/template2/components/AnimatedImage";
import { InviteQr } from "@/app/components/InviteQr";

const MAIN_PHOTO_URL =
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112164/z7567169166281_a251abc992e52c995a57bd08b362d0e5_tgiajr.jpg";
const SECOND_PHOTO_URL =
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169124980_53b5adaf300267f2da9cf5ce31a7bd64_llvbc8.jpg";
const THANK_PHOTO_URL =
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169045289_539fa59b656f30478cd722c4f1caead4_exwkx1.jpg";

const COUPLE_PHOTOS = [
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112164/z7567169166281_a251abc992e52c995a57bd08b362d0e5_tgiajr.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169124980_53b5adaf300267f2da9cf5ce31a7bd64_llvbc8.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169045289_539fa59b656f30478cd722c4f1caead4_exwkx1.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169166520_5423718d4df10eafbbe023e19a97f7b3_bno4rs.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169173521_c19a90417e6ba86df811cee24c098c63_efokkd.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169196323_3b4702c186d3b16047fb5562e0b16385_loml2q.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169094888_93f073910301111ac7b1a451a1103300_it4uks.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169112752_a6bd4cffd4ed597638980efe302a663d_oae40l.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112160/z7567169184298_aa4d6cec82f5eacf4daecf535b727ed3_sx26nl.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169335155_8319f23d2b003801b95bdcc847f24745_r1qso1.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169081707_efaba247a3151e426376a84475311cfd_oa9c6o.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169192058_51297eb938ce52143fec8533634538c2_gr1fgm.jpg",
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1772112159/z7567169188825_356531c2c57f3faa8d45ea4c7210220f_ul30yt.jpg",
];
const INVITE_URL = "https://yen-bach-thanh-nguyen.vercel.app/";
const MUSIC_URL =
  "https://res.cloudinary.com/dpxx4z2on/video/upload/v1772117861/a_thousand_years_s3mzt9.mp3";

type ScrollSectionProps = {
  className?: string;
  children: ReactNode;
};

function ScrollSection({ className = "", children }: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}

export default function WeddingCardPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) =>
        prev === COUPLE_PHOTOS.length - 1 ? 0 : prev + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen((v) => !v);
    if (!hasStartedMusic && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setHasStartedMusic(true);
        })
        .catch(() => {
          // ignore autoplay errors
        });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Phong bì + tên ngắn */}
      <ScrollSection className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.background1}
            alt="Background decorative"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="max-w-md w-full text-center relative z-10">
          <AnimatedText animationType="fadeIn" delay={0}>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
              LỄ VU QUY
            </h1>
          </AnimatedText>

          <AnimatedText animationType="slideUp" delay={200}>
            <p className="text-2xl font-[cursive] text-gray-800 mb-2">
              Cô Hai Bách
            </p>
          </AnimatedText>
          <AnimatedText animationType="slideUp" delay={300}>
            <p className="text-2xl font-[cursive] text-gray-800 mb-6">
              &amp; Cậu Út Nguyên
            </p>
          </AnimatedText>

          {/* Phong bì đỏ */}
          <div
            className="relative mx-auto w-80 h-96 mb-8 cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700 rounded-lg shadow-2xl rotate-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-red-700 to-red-800 rounded-lg shadow-xl" />

            {/* Nắp phong bì */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-red-800 rounded-t-lg origin-top transition-all duration-1000 ease-out ${
                isEnvelopeOpen
                  ? "rotate-[-180deg] opacity-0"
                  : "-skew-y-1 opacity-100"
              }`}
            />

            {/* Con dấu */}
            <div
              className={`absolute top-20 right-8 w-16 h-16 bg-amber-800 rounded-full border-4 border-amber-900 shadow-lg flex items-center justify-center transition-all duration-500 ${
                isEnvelopeOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            >
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">囍</span>
              </div>
            </div>

            {/* Ảnh trong phong bì */}
            <div
              className={`absolute top-32 left-4 right-4 bottom-16 bg-white rounded-lg shadow-inner overflow-hidden transition-all duration-1000 ${
                isEnvelopeOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-4"
              }`}
            >
              <Image
                src={MAIN_PHOTO_URL}
                alt="Yên Bách & Thanh Nguyên"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {!isEnvelopeOpen && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-semibold animate-pulse">
                👆 Chạm để mở thiệp
              </div>
            )}
          </div>

          {/* Tên cô dâu – chú rể ngắn */}
          <AnimatedText animationType="slideLeft" delay={400}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-2xl font-[cursive] text-gray-800">Yên Bách</p>
              <span className="text-red-600 text-2xl animate-pulse">❤</span>
              <p className="text-2xl font-[cursive] text-gray-800">
                Thanh Nguyên
              </p>
            </div>
          </AnimatedText>

          {/* Ngày năm */}
          <AnimatedText animationType="slideRight" delay={600}>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">29.03</p>
              <p className="text-xl text-gray-700">2026</p>
            </div>
          </AnimatedText>

          <div className="absolute bottom-4 left-4 opacity-30">
            <Image
              src={TEMPLATE2_DECORATIVE_IMAGES.doubleDragon}
              alt="Double dragon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 right-4 text-pink-200 text-4xl">
            囍
          </div>
          </div>
      </ScrollSection>

      {/* Section 2: Thư mời chính */}
      <ScrollSection className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.nen2}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="max-w-md w-full bg-white shadow-2xl min-h-screen relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-full opacity-30">
            <Image
              src={TEMPLATE2_DECORATIVE_IMAGES.nen}
              alt="Decorative border"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-red-600 to-red-700 flex items-center justify-center">
            <div className="text-white text-6xl font-bold -rotate-90 whitespace-nowrap">
              囍
            </div>
          </div>

          <div className="p-8 pr-24">
            <AnimatedText animationType="fadeIn" delay={0}>
              <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8 leading-tight">
                {"Thiệp Vu Quy"
                  .split(" ")
                  .map((word, i) => (
                    <AnimatedText
                      key={word + i}
                      animationType="slideUp"
                      delay={i * 100}
                    >
                      <span className="block">{word}</span>
                    </AnimatedText>
                  ))}
              </h1>
            </AnimatedText>

            <AnimatedText animationType="slideLeft" delay={200}>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  NHÀ GÁI
                </h2>
                <p className="text-base text-gray-800">
                  Chủ hôn: Nguyễn Văn Chẳng (Sáu Sẻ)
                </p>
                <p className="text-base text-gray-800">Nguyễn Thị Loan</p>
                <p className="text-sm text-gray-600 mt-1">
                  Đ/c: B3 căn 44 đường số 10, khu đô thị Tây Bắc, Rạch Giá, An
                  Giang
                </p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="slideRight" delay={300}>
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  NHÀ TRAI
                </h2>
                <p className="text-base text-gray-800">
                  Phạm Minh Quân
                </p>
                <p className="text-base text-gray-800">Lê Thị Tuyết</p>
                <p className="text-sm text-gray-600 mt-1">
                  Đ/c: P18-20 đường 3/2, phường Rạch Giá, tỉnh An Giang
                </p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="fadeIn" delay={400}>
              <div className="text-center mb-8">
                <p className="text-base text-gray-700 italic">
                  Trân trọng báo tin lễ vu quy của
                </p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="scale" delay={400}>
              <div className="text-center mb-8">
                <p className="text-3xl font-[cursive] text-gray-800 mb-2">
                  Nguyễn Yên Bách (trưởng nữ)
                </p>
                <span className="text-2xl text-red-600 mx-4">&</span>
                <p className="text-3xl font-[cursive] text-gray-800 mt-2">
                  Phạm Thanh Nguyên (út nam)
                </p>
              </div>
            </AnimatedText>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-600" />
        </div>
      </ScrollSection>

      {/* Section 3: Ảnh chính + ngày giờ + calendar + QR */}
      <ScrollSection className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-15">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.nen2}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="max-w-md w-full relative z-10">
          <AnimatedText animationType="fadeIn" delay={0}>
            <div className="mb-6 flex flex-col items-center justify-center gap-1 text-center">
              <p className="text-3xl font-[cursive] bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 bg-clip-text text-transparent">
                Yên Bách
              </p>
              <p className="text-3xl font-[cursive] bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 bg-clip-text text-transparent">
                &
              </p>
              <p className="text-3xl font-[cursive] bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 bg-clip-text text-transparent">
                Thanh Nguyên
              </p>
            </div>
          </AnimatedText>

          <AnimatedImage animationType="scale" delay={200}>
            <div className="relative w-full h-96 mb-6 border-4 border-red-700 rounded-lg overflow-hidden">
              <Image
                src={COUPLE_PHOTOS[currentPhotoIndex] || SECOND_PHOTO_URL}
                alt="Yên Bách & Thanh Nguyên"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Nút điều hướng slider */}
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/60 transition"
                onClick={() =>
                  setCurrentPhotoIndex((prev) =>
                    prev === 0 ? COUPLE_PHOTOS.length - 1 : prev - 1,
                  )
                }
                aria-label="Ảnh trước"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/60 transition"
                onClick={() =>
                  setCurrentPhotoIndex((prev) =>
                    prev === COUPLE_PHOTOS.length - 1 ? 0 : prev + 1,
                  )
                }
                aria-label="Ảnh tiếp theo"
              >
                ›
              </button>
            </div>
          </AnimatedImage>

          {/* 3 ảnh nhỏ bên dưới slider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {[-1, 0, 1].map((offset) => {
              const len = COUPLE_PHOTOS.length;
              const idx = (currentPhotoIndex + offset + len) % len;
              const isActive = idx === currentPhotoIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className="focus:outline-none"
                  aria-label={`Chọn ảnh ${idx + 1}`}
                >
                  <div
                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-transform duration-200 ${
                      isActive
                        ? "border-red-500 scale-105"
                        : "border-white/60 hover:border-red-400"
                    }`}
                  >
                    <Image
                      src={COUPLE_PHOTOS[idx]}
                      alt={`Ảnh ${idx + 1} Yên Bách & Thanh Nguyên`}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatedText animationType="slideUp" delay={300}>
            <p className="text-2xl font-[cursive] bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 bg-clip-text text-transparent text-center mb-8">
              Trân trọng kính mời
            </p>
          </AnimatedText>

          <WeddingDateTime
            weddingTime="07 giờ 00"
            weddingDate="29.03"
            weddingYear="2026"
            weddingDay="CHỦ NHẬT"
          />

          <div className="mt-4 text-center text-sm text-gray-900 space-y-1">
            <p>
              Lễ vu quy: 07h ngày 29/03/2026 (nhằm ngày 11/02 Bính Ngọ)
            </p>
            <p>
              Tiệc thân mật: 10h ngày 28/03/2026 (nhằm ngày 10/02 Bính Ngọ)
            </p>
            <p>
              Tại tư gia: B3 căn 44 đường số 10, khu đô thị Tây Bắc, Rạch Giá,
              An Giang
            </p>
          </div>

          <div className="mt-6">
            <WeddingCalendar weddingDate="29.03" weddingYear="2026" />
          </div>

          {/* <div className="mt-8 flex justify-center">
            <InviteQr value={INVITE_URL} />
          </div> */}
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-900">
              Tại tư gia: B3 căn 44 đường số 10, khu đô thị Tây Bắc, Rạch Giá,
              An Giang
            </p>
            <div className="relative w-full h-64 rounded-2xl shadow-lg overflow-hidden">
              <iframe
                title="Địa điểm lễ vu quy"
                src="https://www.google.com/maps?q=10.015035,105.069077&z=18&hl=vi&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
                <span className="text-lg">💍</span>
                <span className="text-xs font-semibold text-pink-600">
                  Địa điểm lễ cưới
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Section 4: Cảm ơn */}
      <ScrollSection className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.background1}
            alt="Background decorative"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="max-w-md w-full text-center relative z-10">
          <AnimatedImage animationType="scale" delay={400}>
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={THANK_PHOTO_URL}
                alt="Yên Bách & Thanh Nguyên"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </AnimatedImage>

          <AnimatedText animationType="scale" delay={0}>
            <div className="bg-pink-500 rounded-lg p-8 mb-4">
              <p className="text-5xl font-[cursive] bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Thank You
              </p>
              <p className="text-xl font-[cursive] bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Rất hân hạnh được đón tiếp!
              </p>
            </div>
          </AnimatedText>
        </div>
      </ScrollSection>
    </div>
  );
}

type WeddingDateTimeProps = {
  weddingTime: string;
  weddingDate: string; // "31.03"
  weddingYear: string;
  weddingDay?: string;
};

function WeddingDateTime({
  weddingTime,
  weddingDate,
  weddingYear,
  weddingDay,
}: WeddingDateTimeProps) {
  const parseDate = () => {
    const parts = weddingDate.replace(/[./]/g, ".").split(".");
    if (parts.length >= 2) {
      return {
        day: Number.parseInt(parts[0] || "1", 10) || 1,
        month: Number.parseInt(parts[1] || "1", 10) || 1,
      };
    }
    return { day: 1, month: 1 };
  };

  const { day, month } = parseDate();
  const year =
    Number.parseInt(weddingYear || "", 10) || new Date().getFullYear();

  const getDayOfWeek = () => {
    if (weddingDay) return weddingDay;
    const date = new Date(year, month - 1, day);
    const dayNames = [
      "CN",
      "THỨ 2",
      "THỨ 3",
      "THỨ 4",
      "THỨ 5",
      "THỨ 6",
      "THỨ 7",
    ];
    return dayNames[date.getDay()];
  };

  const monthNames = [
    "THÁNG 01",
    "THÁNG 02",
    "THÁNG 03",
    "THÁNG 04",
    "THÁNG 05",
    "THÁNG 06",
    "THÁNG 07",
    "THÁNG 08",
    "THÁNG 09",
    "THÁNG 10",
    "THÁNG 11",
    "THÁNG 12",
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
        Vào Lúc
      </h3>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center border-r-2 border-gray-200 pr-4">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800">
            {weddingTime}
          </p>
        </div>

        <div className="text-center border-r-2 border-gray-200 pr-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            {getDayOfWeek()}
          </p>
          <p className="text-6xl md:text-7xl font-bold text-gray-900 mb-2">
            {day}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            {monthNames[month - 1] ||
              `THÁNG ${month.toString().padStart(2, "0")}`}
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800">
            Năm {year}
          </p>
        </div>
      </div>
    </div>
  );
}

type WeddingCalendarProps = {
  weddingDate: string; // "31.03"
  weddingYear: string;
};

function WeddingCalendar({ weddingDate, weddingYear }: WeddingCalendarProps) {
  const parseDate = () => {
    const parts = weddingDate.replace(/[./]/g, ".").split(".");
    if (parts.length >= 2) {
      return {
        day: Number.parseInt(parts[0] || "1", 10) || 1,
        month: Number.parseInt(parts[1] || "1", 10) || 1,
      };
    }
    return { day: 1, month: 1 };
  };

  const { day: weddingDay, month: weddingMonth } = parseDate();
  const year =
    Number.parseInt(weddingYear || "", 10) || new Date().getFullYear();

  const firstDay = new Date(year, weddingMonth - 1, 1).getDay();
  const daysInMonth = new Date(year, weddingMonth, 0).getDate();

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const monthNames = [
    "THÁNG 01",
    "THÁNG 02",
    "THÁNG 03",
    "THÁNG 04",
    "THÁNG 05",
    "THÁNG 06",
    "THÁNG 07",
    "THÁNG 08",
    "THÁNG 09",
    "THÁNG 10",
    "THÁNG 11",
    "THÁNG 12",
  ];

  const days: Array<number | null> = [];
  for (let i = 0; i < firstDay; i += 1) days.push(null);
  for (let i = 1; i <= daysInMonth; i += 1) days.push(i);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {monthNames[weddingMonth - 1]} - {year}
      </h3>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (date === null) {
            return <div key={index} className="aspect-square" />;
          }
          const isWeddingDay = date === weddingDay;
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg transition-all relative ${
                isWeddingDay
                  ? "bg-red-600 text-white font-bold"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {date}
              {isWeddingDay && (
                <div className="absolute -top-1 -right-1 text-red-500 text-xl">
                  ❤
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

