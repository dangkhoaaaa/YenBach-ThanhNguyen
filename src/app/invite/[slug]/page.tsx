'use client';

import { useState } from "react";
import Image from "next/image";
import { TEMPLATE2_DECORATIVE_IMAGES } from "@/app/templates/template2/constants";
import { AnimatedText } from "@/app/templates/template2/components/AnimatedText";
import { AnimatedImage } from "@/app/templates/template2/components/AnimatedImage";
import { InviteQr } from "@/app/components/InviteQr";

const MAIN_PHOTO_URL =
  "https://res.cloudinary.com/dpxx4z2on/image/upload/v1766912091/eventcards/rmrifoojfdw4dhs29bxn.webp";

const INVITE_URL = "https://yen-bach-thanh-nguyen.vercel.app/";

export default function WeddingCardPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Phong bì + tên ngắn */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
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
              THIỆP
            </h1>
          </AnimatedText>

          <AnimatedText animationType="slideUp" delay={200}>
            <p className="text-4xl font-[cursive] text-gray-800 mb-8">
              Mời Cưới
            </p>
          </AnimatedText>

          {/* Phong bì đỏ */}
          <div
            className="relative mx-auto w-80 h-96 mb-8 cursor-pointer"
            onClick={() => setIsEnvelopeOpen((v) => !v)}
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
                className="object-cover"
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

          {/* Ngày năm (có thể sửa sau) */}
          <AnimatedText animationType="slideRight" delay={600}>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">31.03</p>
              <p className="text-xl text-gray-700">2025</p>
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
      </section>

      {/* Section 2: Thư mời chính */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
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
                {"Thư Mời Cưới"
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
                  NHÀ TRAI
                </h2>
                <p className="text-base text-gray-800">Gia đình Yên Bách</p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="slideRight" delay={300}>
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  NHÀ GÁI
                </h2>
                <p className="text-base text-gray-800">
                  Gia đình Thanh Nguyên
                </p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="fadeIn" delay={400}>
              <div className="text-center mb-8">
                <p className="text-base text-gray-700 italic">
                  Trân trọng báo tin lễ thành hôn của
                </p>
              </div>
            </AnimatedText>

            <AnimatedText animationType="scale" delay={400}>
              <div className="text-center mb-8">
                <p className="text-3xl font-[cursive] text-gray-800 mb-2">
                  Yên Bách
                </p>
                <span className="text-2xl text-red-600 mx-4">&</span>
                <p className="text-3xl font-[cursive] text-gray-800 mt-2">
                  Thanh Nguyên
                </p>
              </div>
            </AnimatedText>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-600" />
        </div>
      </section>

      {/* Section 3: Ảnh chính + ngày giờ + calendar + QR */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
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
            <div className="text-center mb-6">
              <p className="text-3xl font-[cursive] text-white mb-2">
                Yên Bách
              </p>
              <span className="text-2xl text-white mx-4">&</span>
              <p className="text-3xl font-[cursive] text-white">
                Thanh Nguyên
              </p>
            </div>
          </AnimatedText>

          <AnimatedImage animationType="scale" delay={200}>
            <div className="relative w-full h-96 mb-6 border-4 border-red-700 rounded-lg overflow-hidden">
              <Image
                src={MAIN_PHOTO_URL}
                alt="Yên Bách & Thanh Nguyên"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </AnimatedImage>

          <AnimatedText animationType="slideUp" delay={300}>
            <p className="text-2xl font-[cursive] text-white text-center mb-8">
              Trân trọng kính mời
            </p>
          </AnimatedText>

          <WeddingDateTime
            weddingTime="10 giờ 00"
            weddingDate="31.03"
            weddingYear="2025"
            weddingDay="CHỦ NHẬT"
          />

          <WeddingCalendar weddingDate="31.03" weddingYear="2025" />

          {/* <div className="mt-8 flex justify-center">
            <InviteQr value={INVITE_URL} />
          </div> */}
        </div>
      </section>

      {/* Section 4: Cảm ơn */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
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
                src={MAIN_PHOTO_URL}
                alt="Yên Bách & Thanh Nguyên"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </AnimatedImage>

          <AnimatedText animationType="scale" delay={0}>
            <div className="bg-pink-500 rounded-lg p-8 mb-4">
              <p className="text-5xl font-[cursive] text-white mb-4">
                Thank You
              </p>
              <p className="text-xl font-[cursive] text-white">
                Rất hân hạnh được đón tiếp!
              </p>
            </div>
          </AnimatedText>
        </div>
      </section>
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

