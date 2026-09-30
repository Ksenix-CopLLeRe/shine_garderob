import { useState } from "react";
import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";
import { SITUATIONS } from "@/data/situations";

export default function SituationScreen() {
  const ctx = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const sits = SITUATIONS;

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
      <div style={{ padding: "4px 24px" }}>
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "8px 24px 0" }}
        className="scrollbar-hide"
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Куда
          <br />
          собираетесь?
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#6A6865",
            marginBottom: 28,
          }}
        >
          Выберите ситуацию для образа
        </div>
        {sits.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: `${i === 0 ? 20 : 16}px 12px`,
              border: "none",
              borderBottom: "1px solid #1E1E1E",
              borderLeft:
                selected === s.id
                  ? "2px solid #6B1F2B"
                  : "2px solid transparent",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: i === 0 ? 34 : i < 3 ? 26 : 22,
                  fontWeight: 400,
                  color: "#F3F0E9",
                }}
              >
                {s.l}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#5A5855",
                  marginTop: 3,
                }}
              >
                {s.s}
              </div>
            </div>
            <div
              aria-hidden="true"
              style={{
                width: 18,
                height: 18,
                border: `1px solid ${selected === s.id ? "#F3F0E9" : "#4A4845"}`,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              {selected === s.id && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#6B1F2B",
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ padding: "16px 24px 24px" }}>
          <Btn full onClick={() => ctx.go("wardrobe-source")}>
            Образ — {sits.find((s) => s.id === selected)?.l}
          </Btn>
        </div>
      )}
    </div>
  );
}
