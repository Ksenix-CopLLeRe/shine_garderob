import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Img from "@/components/ui/Img";
import Divider from "@/components/ui/Divider";
import Tag from "@/components/ui/Tag";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";
import { WARDROBE_CATEGORIES } from "@/data/wardrobe";
import { useWardrobeItems } from "@/api/useShineData";
import Notice from "@/components/ui/Notice";
import WardrobeEmptyScreen from "./WardrobeEmptyScreen";

export default function WardrobeFilledScreen() {
  const ctx = useApp();
  const [cat, setCat] = useState("Все");
  const cats = WARDROBE_CATEGORIES;
  const { data, source } = useWardrobeItems();
  // Mock items carry no category, so they stay visible under every tab.
  const things = (data ?? []).filter(
    (t) => cat === "Все" || !t.category || t.category === cat,
  );

  if (source === "api" && data?.length === 0) return <WardrobeEmptyScreen />;

  return (
    <div
      className="shine-style-0466"
    >
      <StatusBar />
      <div
        className="shine-style-0467"
      >
        <div
          className="shine-style-0468"
        >
          Гардероб
        </div>
        <button
          onClick={() => ctx.go("add-item")}
          className="shine-style-0469"
        >
          <I.Plus />
        </button>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0470"
      >
        <div className="shine-style-0471">
          {cats.map((c) => (
            <Tag key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Tag>
          ))}
        </div>
      </div>
      <Divider />
      <div
        
        className="scrollbar-hide shine-style-0472"
      >
        <div
          className="shine-style-0473"
        >
          {things.map((t, i) => (
            <button
              key={i}
              aria-label={`Открыть: ${t.n}`}
              onClick={() => ctx.go("item-card", t.id)}
              className="shine-style-0474"
            >
              <Img
                src={t.img}
                alt={t.n}
                className="shine-style-0475"
              />
              <div
                className="shine-style-0476"
              >
                <span
                  className="shine-style-0477"
                >
                  {t.n}
                </span>
                <span className="shine-style-0478">
                  <I.ChevronRight />
                </span>
              </div>
            </button>
          ))}
        </div>
        {source === "api" && things.length === 0 && (
          <Notice>В этой категории пока нет вещей</Notice>
        )}
        <div className="shine-style-0479" />
      </div>
      <BottomNav active="wardrobe" />
    </div>
  );
}
