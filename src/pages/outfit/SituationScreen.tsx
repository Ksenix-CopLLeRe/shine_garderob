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
      className="shine-style-0221"
    >
      <StatusBar />
      <div className="shine-style-0222">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        
        className="scrollbar-hide shine-style-0223"
      >
        <div
          className="shine-style-0224"
        >
          Куда
          <br />
          собираетесь?
        </div>
        <div
          className="shine-style-0225"
        >
          Выберите ситуацию для образа
        </div>
        {sits.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={["situation-option", i === 0 && "situation-option--lead", selected === s.id && "situation-option--selected"].filter(Boolean).join(" ")}
          >
            <div>
              <div
                className={`situation-option__title situation-option__title--${i === 0 ? "lead" : i < 3 ? "medium" : "small"}`}
              >
                {s.l}
              </div>
              <div
                className="shine-style-0226"
              >
                {s.s}
              </div>
            </div>
            <div
              aria-hidden="true"
              className={["radio", selected === s.id && "radio--selected"].filter(Boolean).join(" ")}
            >
              {selected === s.id && (
                <div
                  className="shine-style-0227"
                />
              )}
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="shine-style-0228">
          <Btn full onClick={() => ctx.go("wardrobe-source")}>
            Образ — {sits.find((s) => s.id === selected)?.l}
          </Btn>
        </div>
      )}
    </div>
  );
}
