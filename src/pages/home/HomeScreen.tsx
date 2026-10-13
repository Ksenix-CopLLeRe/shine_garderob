import { useApp } from "@/app/AppContext";
import { useSavedOutfits } from "@/api/useShineData";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeScreen({ name }: { name: string }) {
  const ctx = useApp();
  const { data: outfits, source } = useSavedOutfits();
  // Latest saved outfit from the API; the mock card stays when the API is unreachable.
  const latest =
    source === "api"
      ? outfits?.[0]
      : {
          id: undefined,
          n: "Дождливый вторник",
          s: "Учёба · 12° · сегодня",
          d: "",
          img: IMGS.editorialBlazer,
        };
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
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        <section style={{ padding: "4px 24px 42px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: 14,
              borderBottom: "1px solid #1E1E1E",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 29,
                fontWeight: 400,
                color: "#F3F0E9",
              }}
            >
              Shine
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#8A8680",
              }}
            >
              Москва · 12° · облачно
            </div>
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#8A8680",
              marginTop: 36,
              marginBottom: 5,
            }}
          >
            Доброе утро, {name}
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 40,
              fontWeight: 400,
              color: "#F3F0E9",
              lineHeight: 1.04,
            }}
          >
            Что надеть <em>сегодня?</em>
          </div>
          <div style={{ height: 172, display: "flex", gap: 8, marginTop: 28 }}>
            <Img
              src={IMGS.editorialBlackJacket}
              alt="fashion editorial"
              style={{ flex: 1.5, height: "100%" }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Img
                src={IMGS.editorialBWCoat}
                alt="fashion detail"
                style={{ flex: 1 }}
              />
              <div
                style={{
                  flex: 0.46,
                  borderTop: "1px solid #6B1F2B",
                  display: "flex",
                  alignItems: "end",
                  paddingBottom: 7,
                }}
              >
                <Caption style={{ color: "#8A8680" }}>На сегодня</Caption>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <Btn full onClick={() => ctx.go("situation")}>
              Подобрать образ
            </Btn>
          </div>
        </section>

        <Divider />

        <section style={{ padding: "18px 24px 32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                color: "#F3F0E9",
              }}
            >
              Мои образы
            </div>
            <button
              onClick={() => ctx.go("saved-outfits")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 4,
                background: "transparent",
                border: "none",
                color: "#8A8680",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Все <I.ChevronRight />
            </button>
          </div>
          {latest && (
            <button
              onClick={() => ctx.go("outfit-detail", latest.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 0,
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Img
                src={latest.img}
                alt={latest.n}
                style={{ width: 78, height: 94 }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    color: "#F3F0E9",
                    marginBottom: 4,
                  }}
                >
                  {latest.n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#8A8680",
                  }}
                >
                  {latest.d ? `${latest.s} · ${latest.d}` : latest.s}
                </div>
              </div>
              <div style={{ color: "#8A8680" }}>
                <I.ChevronRight />
              </div>
            </button>
          )}
        </section>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
