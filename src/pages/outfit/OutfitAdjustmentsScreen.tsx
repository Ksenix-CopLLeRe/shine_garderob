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
      className="shine-style-0141"
    >
      <StatusBar />
      <div
        className="shine-style-0142"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Корректировка</Caption>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0143"
      >
        <div
          className="shine-style-0144"
        >
          Как изменить
          <br />
          образ?
        </div>
        {opts.map((o, i) => (
          <button
            key={i}
            onClick={() => ctx.go("outfit-alternative")}
            className="shine-style-0145"
          >
            <div>
              <div
                className="shine-style-0146"
              >
                {o.l}
              </div>
              <div
                className="shine-style-0147"
              >
                {o.s}
              </div>
            </div>
            <div className="shine-style-0148">
              <I.ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
