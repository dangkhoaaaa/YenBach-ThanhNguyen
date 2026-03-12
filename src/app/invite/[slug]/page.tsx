"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

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

const API_BASE = "https://event-card-ivory.vercel.app";
// Slug cố định cho thiệp 1
const DEFAULT_SLUG = "slug1";

export default function WeddingCardPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [cardId, setCardId] = useState<string | null>(null);
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeSign, setActiveSign] = useState<0 | 1>(0);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [isJoining, setIsJoining] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

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
    // Lấy slug từ params, nếu không có (đang ở "/") thì dùng slug cố định
    const finalSlug = (slug as string | undefined) ?? DEFAULT_SLUG;
    setResolvedSlug(finalSlug);
    const fetchCard = async () => {
      try {
        console.log("[RSVP] Fetch card for slug:", finalSlug);
        const res = await fetch(`${API_BASE}/cards/slug/${finalSlug}`);
        console.log("[RSVP] Card response status:", res.status);
        if (!res.ok) {
          const text = await res.text();
          console.error("[RSVP] Card fetch failed:", text);
          return;
        }
        const data = await res.json();
        console.log("[RSVP] Card data:", data);
        setCardId(data._id || data.id || null);
      } catch (err) {
        console.error("[RSVP] Error fetching card:", err);
      }
    };

    fetchCard();
  }, [slug]);

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!cardId) {
      setSubmitMessage(
        "Không tìm được thông tin thiệp, bạn vui lòng tải lại trang rồi thử gửi lại giúp tụi mình nhé."
      );
      console.error(
        "[RSVP] Missing cardId when submitting RSVP. Current slug:",
        resolvedSlug ?? slug,
        "pathname:",
        typeof window !== "undefined" ? window.location.pathname : "no-window"
      );
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      console.log("[RSVP] Submitting RSVP:", { cardId, name: name.trim() });
      const res = await fetch(`${API_BASE}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId,
          name: name.trim(),
          wish: wish.trim() || undefined,
          isJoining,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("[RSVP] Submit failed:", res.status, errorText);
        throw new Error(errorText || "Gửi xác nhận thất bại");
      }
      setSubmitMessage("Đã ghi nhận, hẹn gặp bạn trong ngày vui!");
      setName("");
      setWish("");
    } catch (error) {
      console.error("[RSVP] Submit error:", error);
      setSubmitMessage("Xin lỗi, có lỗi xảy ra. Bạn thử lại giúp mình nhé.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSign((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const HangingSign = ({
    visible,
    text,
    onClick,
    gradient,
  }: {
    visible: boolean;
    text: string;
    onClick: () => void;
    gradient: string;
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-hidden={!visible}
        style={{
          position: "absolute",
          inset: 0,
          width: 220,
          height: 44,
          margin: "0 auto",
          border: "none",
          background: gradient,
          borderRadius: 14,
          boxShadow: "0 10px 22px rgba(17,24,39,0.18)",
          cursor: "pointer",
          color: "#1f2937",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 700,
          fontSize: 11,
          transform: visible ? "rotate(-1.5deg)" : "rotate(-1.5deg) translateY(-6px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 350ms ease, transform 350ms ease",
        }}
      >
        {text}
      </button>
    );
  };

  return (
    <main
      className="min-h-screen bg-white flex flex-col items-center justify-start relative"
      style={{ paddingTop: 74 }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          pointerEvents: "none",
          padding: "10px 12px 0",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 220,
            height: 58,
            margin: "0 auto",
            pointerEvents: "auto",
          }}
        >
          {/* dây treo */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              width: 2,
              height: 18,
              background: "rgba(107,114,128,0.55)",
              borderRadius: 999,
              transform: "rotate(-8deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 28,
              top: 0,
              width: 2,
              height: 18,
              background: "rgba(107,114,128,0.55)",
              borderRadius: 999,
              transform: "rotate(8deg)",
            }}
          />

          <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 44 }}>
            <HangingSign
              visible={activeSign === 0}
              text="Xác nhận tham gia"
              onClick={() => setIsRsvpOpen(true)}
              gradient="linear-gradient(90deg,#fde68a 0%,#fecaca 55%,#fbcfe8 100%)"
            />
            <HangingSign
              visible={activeSign === 1}
              text="Xem bản đồ"
              onClick={() => setIsMapOpen(true)}
              gradient="linear-gradient(90deg,#bfdbfe 0%,#c7d2fe 55%,#e9d5ff 100%)"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 p-4">
        {PHOTOS.map((src, index) => (
          <div key={src} className="w-full">
            <Image
              src={src}
              alt={`Wedding photo ${index + 1}`}
              width={1080}
              height={1920}
              className="w-full h-auto object-contain"
              sizes="100vw"
            />

            {index === 4 && <div style={{ height: 6 }} />}
          </div>
        ))}
      </div>

      {isRsvpOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 640,
              borderRadius: 24,
              background:
                "linear-gradient(135deg,#fff7f2 0%,#ffeae5 40%,#ffeef6 100%)",
              border: "1px solid #f4c8c2",
              boxShadow: "0 18px 45px rgba(182,129,112,0.45)",
              padding: "28px 32px 26px",
              boxSizing: "border-box",
              fontFamily:
                '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              color: "#6b3833",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsRsvpOpen(false);
                setSubmitMessage(null);
              }}
              style={{
                position: "absolute",
                right: 18,
                top: 16,
                border: "none",
                background: "transparent",
                color: "#d2a0a0",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>

            <h2
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "#b1615a",
                margin: "4px 0 8px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Xác nhận tham gia <span>💌</span>
            </h2>

            <p
              style={{
                fontSize: 14,
                color: "#b57a73",
                marginBottom: 18,
              }}
            >
              Vui lòng nhập tên và lời chúc (nếu có), đồng thời cho tụi mình biết
              bạn có thể đến chung vui không nhé.
            </p>

            <form onSubmit={handleSubmitRsvp}>
              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#c08b82",
                    marginBottom: 6,
                  }}
                >
                  Tên của bạn
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  required
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    border: "1px solid #f5d4c9",
                    padding: "9px 14px",
                    fontSize: 13,
                    boxSizing: "border-box",
                    outline: "none",
                    backgroundColor: "#ffffff",
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#c08b82",
                    marginBottom: 6,
                  }}
                >
                  Lời chúc gửi đến tụi mình (không bắt buộc)
                </div>
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  rows={3}
                  placeholder="Bạn có thể gửi lời chúc hoặc nhắn gì đó dễ thương tại đây..."
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    border: "1px solid #f5d4c9",
                    padding: "10px 14px",
                    fontSize: 13,
                    boxSizing: "border-box",
                    outline: "none",
                    resize: "none",
                    backgroundColor: "#ffffff",
                  }}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 12px",
                  borderRadius: 16,
                  border: "1px solid #f5d4c9",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  marginBottom: 10,
                }}
              >
                <input
                  type="checkbox"
                  checked={isJoining}
                  onChange={(e) => setIsJoining(e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 13, color: "#b1615a" }}>
                  Mình sẽ cố gắng sắp xếp đến chung vui cùng hai bạn
                </span>
              </label>

              {submitMessage && (
                <p
                  style={{
                    fontSize: 12,
                    color: "#b57a73",
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  {submitMessage}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "10px 26px",
                    borderRadius: 999,
                    border: "none",
                    background:
                      "linear-gradient(90deg,#c56058 0%,#d37968 50%,#c56058 100%)",
                    color: "#ffffff",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRsvpOpen(false);
                    setSubmitMessage(null);
                  }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    border: "1px solid transparent",
                    background: "transparent",
                    fontSize: 12,
                    color: "#b57a73",
                    cursor: "pointer",
                  }}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMapOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 40,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 720,
              borderRadius: 24,
              background:
                "radial-gradient(circle at top,#fff7f2 0%,#f5f5f5 55%,#ececec 100%)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.45)",
              padding: "16px 18px 18px",
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setIsMapOpen(false)}
              style={{
                position: "absolute",
                right: 18,
                top: 14,
                border: "none",
                background: "transparent",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 6px 10px 8px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Bản đồ đến địa điểm cưới
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    marginTop: 2,
                  }}
                >
                  Bạn có thể phóng to / thu nhỏ hoặc mở trong Google Maps.
                </div>
              </div>
            </div>
            <div
              style={{
                overflow: "hidden",
                borderRadius: 18,
                border: "1px solid #e5e7eb",
                height: "60vh",
                backgroundColor: "#000",
              }}
            >
              <iframe
                title="Bản đồ đám cưới"
                src="https://www.google.com/maps?q=10.015035,105.069077&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

