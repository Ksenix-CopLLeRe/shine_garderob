import { useState, useEffect } from "react";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function ItemRecognitionScreen() {
  const ctx = useApp();
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d >= 3 ? 1 : d + 1)), 600);
    return () => clearInterval(t);
  }, []);

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
        <Img
          src={IMGS.itemWhiteShirt}
          alt="clothing item"
          style={{ width: "100%", flex: 1, marginBottom: 32 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  background: i < dots ? "#F3F0E9" : "#252525",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#8A8680",
            }}
          >
            Определяем характеристики вещи
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <Btn small onClick={() => ctx.go("recognition-result")}>
            Показать результат
          </Btn>
        </div>
      </div>
    </div>
  );
}
