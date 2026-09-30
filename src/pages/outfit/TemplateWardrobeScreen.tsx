import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";
import { TEMPLATE_WARDROBE } from "@/data/wardrobe";

export default function TemplateWardrobeScreen() {
  const ctx = useApp();
  const items = TEMPLATE_WARDROBE;

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
          gap: 12,
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Пример</Caption>
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "8px 24px 0" }}
        className="scrollbar-hide"
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#F3F0E9",
            marginBottom: 4,
            marginTop: 8,
          }}
        >
          Базовый гардероб
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#6A6865",
            marginBottom: 24,
          }}
        >
          5 вещей для любой ситуации
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ gridColumn: item.span ? "span 2" : undefined }}
            >
              <Img
                src={item.img}
                alt={item.s}
                style={{ width: "100%", height: item.span ? 180 : 140 }}
              />
              <div style={{ paddingTop: 8 }}>
                <Caption>{item.l}</Caption>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#F3F0E9",
                    marginTop: 2,
                  }}
                >
                  {item.s}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
      <div style={{ padding: "16px 24px 28px" }}>
        <Btn full onClick={() => ctx.go("outfit-loading")}>
          Подобрать образ из этих вещей
        </Btn>
      </div>
    </div>
  );
}
