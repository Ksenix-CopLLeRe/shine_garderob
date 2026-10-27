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
      className="shine-style-0166"
    >
      <div
        className="shine-style-0167"
      >
        <div
          className="shine-style-0168"
        >
          <div
            className="shine-style-0169"
          />
        </div>
        <div className="shine-style-0170">
          <div
            className="shine-style-0171"
          >
            {steps[step]}
          </div>
          <div
            className="shine-style-0172"
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
