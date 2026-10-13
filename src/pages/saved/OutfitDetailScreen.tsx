import { useApp } from "@/app/AppContext";
import { useOutfitDetail } from "@/api/useShineData";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import Notice from "@/components/ui/Notice";
import StatusBar from "@/components/layout/StatusBar";
import { I } from "@/components/icons";

export default function OutfitDetailScreen() {
  const ctx = useApp();
  const id = ctx.params.id;
  const { data: outfit, source } = useOutfitDetail(id);

  // Collage: cover large on the left, next two stacked on the right, the rest in a row below.
  const rest = outfit?.items.slice(1) ?? [];
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2);

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
          disabled={!outfit}
          onClick={() => ctx.go("confirm-modal", id && `outfit:${id}`)}
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
      {source === "error" && (
        <Notice>Не удалось загрузить образ. Возможно, он удалён.</Notice>
      )}
      {outfit && (
        <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
          <div style={{ padding: "8px 16px 12px" }}>
            <div style={{ display: "flex", gap: 8, height: 220 }}>
              <Img
                src={outfit.cover}
                alt={outfit.name}
                style={{ flex: 1.2, height: "100%" }}
              />
              {side.length > 0 && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {side.map((p, i) => (
                    <Img
                      key={p.id ?? i}
                      src={p.img}
                      alt={p.name}
                      style={{ flex: 1 }}
                    />
                  ))}
                </div>
              )}
            </div>
            {bottom.length > 0 && (
              <div
                style={{ display: "flex", gap: 8, height: 100, marginTop: 8 }}
              >
                {bottom.map((p, i) => (
                  <Img
                    key={p.id ?? i}
                    src={p.img}
                    alt={p.name}
                    style={{ flex: 1 }}
                  />
                ))}
              </div>
            )}
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
              {outfit.name}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#5A5855",
                marginBottom: outfit.comment ? 12 : 24,
              }}
            >
              {outfit.subtitle}
            </div>
            {outfit.comment && (
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#B8B4AC",
                  marginBottom: 24,
                }}
              >
                {outfit.comment}
              </div>
            )}
            <Divider />
            <div style={{ paddingTop: 20 }}>
              <Caption style={{ marginBottom: 14 }}>Вещи</Caption>
              {source === "api" && outfit.items.length < 2 && (
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#8A8680",
                    paddingBottom: 8,
                  }}
                >
                  Часть вещей удалена из гардероба
                </div>
              )}
              {outfit.items.map((p, i) => (
                <button
                  key={p.id ?? i}
                  onClick={() => ctx.go("item-card", p.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #1E1E1E",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Img
                    src={p.img}
                    alt={p.name}
                    style={{ width: 40, height: 50 }}
                  />
                  <div
                    style={{
                      flex: 1,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#F3F0E9",
                    }}
                  >
                    {p.name}
                  </div>
                  <span style={{ color: "#3D3D3B" }}>
                    <I.ChevronRight />
                  </span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Btn full onClick={() => ctx.go("outfit-loading")}>
                Повторить образ
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
