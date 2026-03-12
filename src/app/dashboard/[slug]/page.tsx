"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Guest = {
  _id: string;
  name: string;
  wish?: string;
  isJoining?: boolean;
  createdAt?: string;
};

type Card = {
  _id: string;
  title?: string;
  hostName?: string;
};

const API_BASE = "https://event-card-ivory.vercel.app";

export default function DashboardBySlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cardRes = await fetch(`${API_BASE}/cards/slug/${slug}`);
        if (!cardRes.ok) {
          throw new Error("Không tìm thấy thiệp với slug này");
        }
        const cardData: Card & { id?: string } = await cardRes.json();
        const cardId = cardData._id || cardData.id;
        setCard(cardData);

        const guestsRes = await fetch(`${API_BASE}/guests?cardId=${cardId}`);
        if (!guestsRes.ok) {
          throw new Error("Không lấy được danh sách khách");
        }
          const guestsData: Guest[] = await guestsRes.json();

          setGuests(guestsData);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Có lỗi xảy ra, vui lòng thử lại.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#fff7f2 0%,#f3f4f6 55%,#e5e7eb 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
        boxSizing: "border-box",
        fontFamily:
          '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 24,
          boxShadow: "0 18px 45px rgba(15,23,42,0.25)",
          padding: "24px 24px 28px",
          boxSizing: "border-box",
          border: "1px solid rgba(209,213,219,0.6)",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#111827",
            marginBottom: 4,
          }}
        >
          Khách đã xác nhận tham dự
        </h1>
        {card && (
          <p
            style={{
              fontSize: 13,
              color: "#4b5563",
              marginBottom: 20,
            }}
          >
            Thiệp:{" "}
            <span style={{ fontWeight: 600 }}>{card.title}</span>
            {card.hostName && (
              <>
                {" "}
                • Chủ tiệc: <span>{card.hostName}</span>
              </>
            )}
          </p>
        )}

        {isLoading && (
          <p style={{ fontSize: 13, color: "#4b5563" }}>Đang tải dữ liệu...</p>
        )}

        {error && !isLoading && (
          <p style={{ fontSize: 13, color: "#b91c1c", marginBottom: 12 }}>
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#374151",
                    marginBottom: 2,
                  }}
                >
                  Tổng số khách đã gửi form:{" "}
                  <span style={{ fontWeight: 600 }}>{guests.length}</span>
                </p>
                <p style={{ fontSize: 11, color: "#6b7280" }}>
                  Trong đó{" "}
                  <span style={{ fontWeight: 600 }}>
                    {guests.filter((g) => g.isJoining).length}
                  </span>{" "}
                  khách đánh dấu sẽ đến chung vui.
                </p>
              </div>
            </div>

            {guests.length === 0 ? (
              <div
                style={{
                  borderRadius: 18,
                  border: "1px dashed #d1d5db",
                  backgroundColor: "#ffffff",
                  padding: "28px 16px",
                  textAlign: "center",
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                Chưa có ai xác nhận tham dự. Bạn gửi thiệp thêm cho mọi người
                nhé.
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 18,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f3f4f6",
                        textAlign: "left",
                      }}
                    >
                      <th style={{ padding: "8px 12px", color: "#374151" }}>
                        #
                      </th>
                      <th style={{ padding: "8px 12px", color: "#374151" }}>
                        Tên khách
                      </th>
                      <th style={{ padding: "8px 12px", color: "#374151" }}>
                        Tham gia
                      </th>
                      <th style={{ padding: "8px 12px", color: "#374151" }}>
                        Lời chúc
                      </th>
                      <th style={{ padding: "8px 12px", color: "#374151" }}>
                        Thời gian
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest, index) => (
                      <tr
                        key={guest._id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f9fafb",
                        }}
                      >
                        <td
                          style={{
                            padding: "8px 12px",
                            color: "#374151",
                            verticalAlign: "middle",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            color: "#111827",
                            fontWeight: 500,
                            verticalAlign: "middle",
                          }}
                        >
                          {guest.name}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            color: "#374151",
                            verticalAlign: "middle",
                          }}
                        >
                          {guest.isJoining ? "Có" : "Chưa chắc / Không"}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            color: "#4b5563",
                            verticalAlign: "middle",
                            maxWidth: 280,
                          }}
                        >
                          {guest.wish || (
                            <span style={{ color: "#9ca3af" }}>-</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            color: "#4b5563",
                            verticalAlign: "middle",
                          }}
                        >
                          {guest.createdAt
                            ? new Date(guest.createdAt).toLocaleString("vi-VN")
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
