import { useState, useEffect } from "react";
import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";

export default function OutfitLoadingScreen() {
  const ctx = useApp();
  const [step, setStep] = useState(0);
  const steps = [
    "Собираем образ для учёбы",
    "Учитываем +14°, дождь",
    "Подбираем из вашего гардероба",
  ];
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => Math.min(s + 1, steps.length - 1)),
      1300,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0D0D0D",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            width: 60,
            height: 1,
            background: "#252525",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "100%",
              background: "#F3F0E9",
              animation: "slideLoader 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontStyle: "italic",
              color: "#F3F0E9",
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            {steps[step]}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#5A5855",
              letterSpacing: "0.05em",
            }}
          >
            Учитываем погоду и предпочтения
          </div>
        </div>
        <Btn small onClick={() => ctx.go("outfit-result")}>
          Показать результат
        </Btn>
      </div>
    </div>
  );
}
