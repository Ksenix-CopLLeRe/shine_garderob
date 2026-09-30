import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function ConfirmModalScreen() {
  const ctx = useApp();
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
          Удалить вещь?
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
          Вещь будет удалена из гардероба. Образы с этой вещью останутся.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn full variant="accent" onClick={() => ctx.go("wardrobe-filled")}>
            Удалить
          </Btn>
          <Btn full variant="secondary" onClick={() => ctx.back()}>
            Отмена
          </Btn>
        </div>
      </div>
    </div>
  );
}
