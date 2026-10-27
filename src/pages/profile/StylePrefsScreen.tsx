import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Tag from "@/components/ui/Tag";
import StatusBar from "@/components/layout/StatusBar";
import { STYLE_OPTIONS, STYLE_MOOD_IMAGES } from "@/data/styles";

export default function StylePrefsScreen() {
  const ctx = useApp();
  const [sel, setSel] = useState<string[]>(["Минимализм", "Кэжуал"]);
  const styles = STYLE_OPTIONS;
  const moodImgs = STYLE_MOOD_IMAGES;
  const toggle = (s: string) =>
    setSel((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div
      className="shine-style-0276"
    >
      <StatusBar />
      <div className="shine-style-0277">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        
        className="scrollbar-hide shine-style-0278"
      >
        <div
          className="shine-style-0279"
        >
          Ваш стиль
        </div>
        <div
          className="shine-style-0280"
        >
          Выберите направления — Shine учтёт их при подборе образов
        </div>
        <div
          className="shine-style-0281"
        >
          {styles.map((s) => (
            <Tag key={s} active={sel.includes(s)} onClick={() => toggle(s)}>
              {s}
            </Tag>
          ))}
        </div>
        <Caption className="shine-style-0282">Вдохновение</Caption>
        <div
          className="shine-style-0283"
        >
          {sel.slice(0, 4).map((s, i) => (
            <div key={i}>
              <Img
                src={moodImgs[s] || IMGS.editorialBlazer}
                alt={s}
                className="shine-style-0284"
              />
              <div
                className="shine-style-0285"
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shine-style-0286">
        <Btn full onClick={() => ctx.go("profile")}>
          Сохранить
        </Btn>
      </div>
    </div>
  );
}
