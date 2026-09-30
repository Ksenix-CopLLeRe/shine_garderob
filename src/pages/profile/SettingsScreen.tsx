import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function SettingsScreen() {
  const ctx = useApp();
  const items = [
    { l: "Аккаунт", s: ctx.userName || "Алина" },
    { l: "Персонализация", s: "Стиль и предпочтения" },
    { l: "Погода / Город", s: "Москва" },
    { l: "Уведомления", s: "Включены" },
    { l: "Конфиденциальность", s: null },
    { l: "Обратная связь", s: null },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
      }}
    >
      <StatusBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 24px 12px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 400,
            color: "#F3F0E9",
          }}
        >
          Настройки
        </div>
      </div>
      <Divider />
      <div
        style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}
        className="scrollbar-hide"
      >
        {items.map((item, i) => (
          <button
            key={i}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 0",
              borderBottom: "1px solid #1E1E1E",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#F3F0E9",
                }}
              >
                {item.l}
              </div>
              {item.s && (
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#5A5855",
                    marginTop: 2,
                  }}
                >
                  {item.s}
                </div>
              )}
            </div>
            <div style={{ color: "#3D3D3B" }}>
              <I.ChevronRight />
            </div>
          </button>
        ))}
        <div style={{ paddingTop: 32, paddingBottom: 24 }}>
          <button
            onClick={() => {
              ctx.setAuth(false);
              ctx.go("welcome");
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#6B1F2B",
              letterSpacing: "0.04em",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}
