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
            fontSize: 34,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          Ваш стиль
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#6A6865",
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          Выберите направления — Shine учтёт их при подборе образов
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {styles.map((s) => (
            <Tag key={s} active={sel.includes(s)} onClick={() => toggle(s)}>
              {s}
            </Tag>
          ))}
        </div>
        <Caption style={{ marginBottom: 16 }}>Вдохновение</Caption>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {sel.slice(0, 4).map((s, i) => (
            <div key={i}>
              <Img
                src={moodImgs[s] || IMGS.editorialBlazer}
                alt={s}
                style={{ width: "100%", height: 120 }}
              />
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#5A5855",
                  marginTop: 6,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 24px 28px" }}>
        <Btn full onClick={() => ctx.go("profile")}>
          Сохранить
        </Btn>
      </div>
    </div>
  );
}
