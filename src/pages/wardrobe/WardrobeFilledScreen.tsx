import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Img from "@/components/ui/Img";
import Divider from "@/components/ui/Divider";
import Tag from "@/components/ui/Tag";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";
import { WARDROBE_CATEGORIES, WARDROBE_ITEMS } from "@/data/wardrobe";

export default function WardrobeFilledScreen() {
  const ctx = useApp();
  const [cat, setCat] = useState("Все");
  const cats = WARDROBE_CATEGORIES;
  const things = WARDROBE_ITEMS;

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 24px 8px",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 400,
            color: "#F3F0E9",
          }}
        >
          Гардероб
        </div>
        <button
          onClick={() => ctx.go("add-item")}
          style={{
            color: "#F3F0E9",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <I.Plus />
        </button>
      </div>
      <div
        style={{ overflowX: "auto", padding: "0 24px 12px" }}
        className="scrollbar-hide"
      >
        <div style={{ display: "flex", gap: 8, width: "max-content" }}>
          {cats.map((c) => (
            <Tag key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Tag>
          ))}
        </div>
      </div>
      <Divider />
      <div
        style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}
        className="scrollbar-hide"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {things.map((t, i) => (
            <button
              key={i}
              aria-label={`Открыть: ${t.n}`}
              onClick={() => ctx.go("item-card")}
              style={{
                padding: 0,
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Img
                src={t.img}
                alt={t.n}
                style={{ width: "100%", aspectRatio: "3/4" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: "#8A8680",
                  marginTop: 6,
                  paddingLeft: 2,
                }}
              >
                {t.n}
                <span style={{ color: "#5A5855" }}>
                  <I.ChevronRight />
                </span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="wardrobe" />
    </div>
  );
}
