import { useState } from "react";
import type { Screen } from "@/navigation/screens";
import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function WardrobeSourceScreen() {
  const ctx = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const sources = [
    {
      id: "mine",
      l: "Мои вещи",
      s: "Добавить свои вещи и начать",
      sc: "wardrobe-filled" as Screen,
    },
    {
      id: "sample",
      l: "Пример гардероба",
      s: "Попробовать на готовом наборе",
      sc: "template-wardrobe" as Screen,
    },
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
      <div style={{ padding: "4px 24px" }}>
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8px 24px 40px",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 12,
            marginTop: 8,
          }}
        >
          Из чего
          <br />
          соберём образ?
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Попробовать Shine можно без регистрации и заполнения гардероба.
        </div>
        <div style={{ flex: 1 }}>
          {sources.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 0",
                borderTop: "1px solid #1E1E1E",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 24,
                    color: "#F3F0E9",
                    marginBottom: 4,
                  }}
                >
                  {item.l}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#5A5855",
                  }}
                >
                  {item.s}
                </div>
              </div>
              <div
                aria-hidden="true"
                style={{
                  width: 18,
                  height: 18,
                  border: `1px solid ${selected === item.id ? "#F3F0E9" : "#4A4845"}`,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {selected === item.id && (
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
          <div style={{ height: 1, background: "#1E1E1E" }} />
        </div>
      </div>
      {selected && (
        <div style={{ padding: "16px 24px 24px" }}>
          <Btn
            full
            onClick={() =>
              ctx.go(sources.find((source) => source.id === selected)!.sc)
            }
          >
            Продолжить — {sources.find((source) => source.id === selected)?.l}
          </Btn>
        </div>
      )}
    </div>
  );
}
