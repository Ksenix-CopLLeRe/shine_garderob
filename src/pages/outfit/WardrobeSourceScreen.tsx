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
      className="shine-style-0239"
    >
      <StatusBar />
      <div className="shine-style-0240">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0241"
      >
        <div
          className="shine-style-0242"
        >
          Из чего
          <br />
          соберём образ?
        </div>
        <div
          className="shine-style-0243"
        >
          Попробовать Shine можно без регистрации и заполнения гардероба.
        </div>
        <div className="shine-style-0244">
          {sources.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className="shine-style-0245"
            >
              <div>
                <div
                  className="shine-style-0246"
                >
                  {item.l}
                </div>
                <div
                  className="shine-style-0247"
                >
                  {item.s}
                </div>
              </div>
              <div
                aria-hidden="true"
                className={["radio", selected === item.id && "radio--selected"].filter(Boolean).join(" ")}
              >
                {selected === item.id && (
                  <div
                    className="shine-style-0248"
                  />
                )}
              </div>
            </button>
          ))}
          <div className="shine-style-0249" />
        </div>
      </div>
      {selected && (
        <div className="shine-style-0250">
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
