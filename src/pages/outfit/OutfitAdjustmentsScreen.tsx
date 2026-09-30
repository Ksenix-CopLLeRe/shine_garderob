import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function OutfitAdjustmentsScreen() {
  const ctx = useApp();
  const opts = [
    { l: "Другой стиль", s: "Сменить направление" },
    { l: "Хочу теплее", s: "Добавить слои" },
    { l: "Хочу легче", s: "Убрать лишнее" },
    { l: "Более базовый", s: "Минимализм" },
    { l: "Более выразительный", s: "Акцент на детали" },
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
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Корректировка</Caption>
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "8px 24px 0" }}
        className="scrollbar-hide"
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 32,
            marginTop: 8,
          }}
        >
          Как изменить
          <br />
          образ?
        </div>
        {opts.map((o, i) => (
          <button
            key={i}
            onClick={() => ctx.go("outfit-alternative")}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
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
                  fontSize: 16,
                  color: "#F3F0E9",
                  fontWeight: 500,
                }}
              >
                {o.l}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "#5A5855",
                  marginTop: 3,
                }}
              >
                {o.s}
              </div>
            </div>
            <div style={{ color: "#3D3D3B" }}>
              <I.ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
