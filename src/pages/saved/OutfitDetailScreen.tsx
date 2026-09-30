import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import { OUTFIT_PIECES } from "@/data/outfits";

export default function OutfitDetailScreen() {
  const ctx = useApp();
  const pieces = OUTFIT_PIECES;

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
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => ctx.go("confirm-modal")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#6B1F2B",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Удалить
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        {/* Collage */}
        <div style={{ padding: "8px 16px 12px" }}>
          <div style={{ display: "flex", gap: 8, height: 220 }}>
            <Img
              src={IMGS.itemCoat}
              alt="coat"
              style={{ flex: 1.2, height: "100%" }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Img src={IMGS.itemWhiteShirt} alt="shirt" style={{ flex: 1 }} />
              <Img src={IMGS.itemBlackJeans} alt="jeans" style={{ flex: 1 }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, height: 100, marginTop: 8 }}>
            <Img src={IMGS.itemLoafers} alt="loafers" style={{ flex: 1 }} />
            <Img src={IMGS.itemBlackBag} alt="bag" style={{ flex: 0.8 }} />
          </div>
        </div>
        <Divider />
        <div style={{ padding: "20px 24px 32px" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 400,
              color: "#F3F0E9",
              marginBottom: 8,
            }}
          >
            Дождливый вторник
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#5A5855",
              marginBottom: 24,
            }}
          >
            Учёба · +14° · 10 сентября
          </div>
          <Divider />
          <div style={{ paddingTop: 20 }}>
            <Caption style={{ marginBottom: 14 }}>Вещи</Caption>
            {pieces.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid #1E1E1E",
                }}
              >
                <Img src={p.img} alt={p.n} style={{ width: 40, height: 50 }} />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#F3F0E9",
                  }}
                >
                  {p.n}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Btn full onClick={() => ctx.go("outfit-loading")}>
              Повторить образ
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
