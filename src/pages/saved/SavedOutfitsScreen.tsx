import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Img from "@/components/ui/Img";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";
import { SAVED_OUTFITS } from "@/data/outfits";

export default function SavedOutfitsScreen() {
  const ctx = useApp();
  const outfits = SAVED_OUTFITS;

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
      <div style={{ padding: "4px 24px 12px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 400,
            color: "#F3F0E9",
          }}
        >
          Образы
        </div>
      </div>
      <Divider />
      <div
        style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}
        className="scrollbar-hide"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {outfits.map((o, i) => (
            <button
              key={i}
              aria-label={`Открыть образ: ${o.n}`}
              onClick={() => ctx.go("outfit-detail")}
              style={{
                gridColumn: o.big ? "span 2" : undefined,
                padding: 0,
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Img
                src={o.img}
                alt={o.n}
                style={{ width: "100%", height: o.big ? 220 : 175 }}
              />
              <div style={{ paddingTop: 10, paddingBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 4,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: o.big ? 20 : 16,
                    color: "#F3F0E9",
                    marginBottom: 4,
                  }}
                >
                  <span>{o.n}</span>
                  <span style={{ color: "#8A8680" }}>
                    <I.ChevronRight />
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#5A5855",
                  }}
                >
                  {o.s} · {o.d}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>
      <BottomNav active="outfits" />
    </div>
  );
}
