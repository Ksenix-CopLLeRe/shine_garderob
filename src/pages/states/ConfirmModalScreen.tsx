import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { deleteItem, deleteOutfit } from "@/api/shine";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

// params.id is "item:<id>" or "outfit:<id>"; without it the screen is the static mock.
const TEXT = {
  item: {
    title: "Удалить вещь?",
    body: "Вещь будет удалена из гардероба и пропадёт из образов, где используется.",
  },
  outfit: {
    title: "Удалить образ?",
    body: "Образ будет удалён. Вещи останутся в гардеробе.",
  },
};

export default function ConfirmModalScreen() {
  const ctx = useApp();
  const [kind, id] = (ctx.params.id ?? "").split(":") as [string, string?];
  const target =
    id && (kind === "item" || kind === "outfit")
      ? { kind: kind as keyof typeof TEXT, id }
      : null;
  const text = TEXT[target?.kind ?? "item"];
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const confirm = async () => {
    if (!target) return ctx.go("wardrobe-filled");
    if (pending) return;
    setPending(true);
    setError(false);
    try {
      await (target.kind === "item"
        ? deleteItem(target.id)
        : deleteOutfit(target.id));
      // Skip the deleted record's card: back to wherever it was opened from.
      ctx.back(2);
    } catch {
      setError(true);
      setPending(false);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
        position: "relative",
      }}
    >
      <StatusBar />
      <div
        style={{
          flex: 1,
          opacity: 0.2,
          padding: "12px 16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            color: "#F3F0E9",
            marginBottom: 16,
          }}
        >
          Гардероб
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {[
            IMGS.itemWhiteShirt,
            IMGS.itemBlackJeans,
            IMGS.itemCoat,
            IMGS.itemLoafers,
            IMGS.itemBlackBag,
            IMGS.itemGraySuit,
          ].map((src, i) => (
            <Img key={i} src={src} alt="item" style={{ height: 90 }} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#181818",
          borderTop: "1px solid #252525",
          padding: "32px 24px 44px",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 400,
            color: "#F3F0E9",
            marginBottom: 8,
          }}
        >
          {text.title}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          {text.body}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {error && (
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#C0525F",
                textAlign: "center",
              }}
            >
              Не удалось удалить. Проверьте, что API запущен.
            </div>
          )}
          <Btn full variant="accent" onClick={confirm}>
            {pending ? "Удаляем…" : "Удалить"}
          </Btn>
          <Btn full variant="secondary" onClick={() => ctx.back()}>
            Отмена
          </Btn>
        </div>
      </div>
    </div>
  );
}
