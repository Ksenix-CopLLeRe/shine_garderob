import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function OutfitAlternativeScreen() {
  const ctx = useApp();
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
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Вариант 2</Caption>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        <div style={{ padding: "8px 16px 0" }}>
          <div style={{ height: 220, display: "flex", gap: 8 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Img
                src={IMGS.itemGraySuit}
                alt="gray suit"
                style={{ flex: 1.4 }}
              />
              <Img src={IMGS.itemJeansDetail} alt="jeans" style={{ flex: 1 }} />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Img
                src={IMGS.itemBeltDetail}
                alt="accessory"
                style={{ flex: 0.8 }}
              />
              <Img
                src={IMGS.itemLeatherShoes}
                alt="leather shoes"
                style={{ flex: 1.2 }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 24px",
            background: "#141414",
            borderTop: "1px solid #1E1E1E",
            borderBottom: "1px solid #1E1E1E",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#6B1F2B",
              letterSpacing: "0.04em",
            }}
          >
            ● Рекомендации обновлены — теплее и базовее
          </div>
        </div>

        <div style={{ padding: "8px 24px 32px" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 400,
              color: "#F3F0E9",
              marginBottom: 8,
            }}
          >
            Тёплый минимализм
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#8A8680",
              lineHeight: 1.65,
              marginBottom: 24,
            }}
          >
            Серый жакет вместо рубашки — образ стал строже, но не потерял линию.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn
              full
              onClick={() =>
                ctx.isAuth ? ctx.go("save-success") : ctx.go("save-guest")
              }
            >
              Сохранить образ
            </Btn>
            <Btn
              full
              variant="secondary"
              onClick={() => ctx.go("outfit-adjustments")}
            >
              Изменить ещё
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
