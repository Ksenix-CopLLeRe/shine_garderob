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
      className="shine-style-0325"
    >
      <StatusBar />
      <div
        className="shine-style-0326"
      >
        <div
          className="shine-style-0327"
        >
          Гардероб
        </div>
        <div
          className="shine-style-0328"
        >
          {[
            IMGS.itemWhiteShirt,
            IMGS.itemBlackJeans,
            IMGS.itemCoat,
            IMGS.itemLoafers,
            IMGS.itemBlackBag,
            IMGS.itemGraySuit,
          ].map((src, i) => (
            <Img key={i} src={src} alt="item" className="shine-style-0329" />
          ))}
        </div>
      </div>
      <div
        className="shine-style-0330"
      >
        <div
          className="shine-style-0331"
        >
          {text.title}
        </div>
        <div
          className="shine-style-0332"
        >
          {text.body}
        </div>
        <div className="shine-style-0333">
          {error && (
            <div
              className="shine-style-0334"
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
