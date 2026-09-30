import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";
import { REPLACEMENT_OPTIONS } from "@/data/outfits";

export default function ReplaceItemScreen() {
  const ctx = useApp();
  const alts = REPLACEMENT_OPTIONS;

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
        <Caption>Замена вещи</Caption>
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "8px 24px 0" }}
        className="scrollbar-hide"
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#6A6865",
            marginBottom: 20,
          }}
        >
          Выберите замену для{" "}
          <span style={{ color: "#F3F0E9" }}>Белой рубашки</span> — применим её
          сразу
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: "1px solid #1E1E1E",
          }}
        >
          <Img
            src={IMGS.itemWhiteShirt}
            alt="white shirt"
            style={{ width: 80, height: 100 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#5A5855",
                marginBottom: 4,
              }}
            >
              Текущая вещь
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#F3F0E9",
              }}
            >
              Белая рубашка
            </div>
          </div>
        </div>
        <Caption style={{ marginBottom: 16 }}>
          Альтернативы из гардероба
        </Caption>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            paddingBottom: 24,
          }}
        >
          {alts.map((a, i) => (
            <button
              key={i}
              onClick={() => ctx.go("outfit-result")}
              style={{
                padding: 0,
                background: "#121212",
                border: "1px solid #2A2A2A",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Img
                src={a.img}
                alt={a.n}
                style={{ width: "100%", height: 130 }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 4,
                  padding: "9px 8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#F3F0E9",
                }}
              >
                <span>{a.n}</span>
                <span style={{ color: "#8A8680" }}>
                  <I.ChevronRight />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
