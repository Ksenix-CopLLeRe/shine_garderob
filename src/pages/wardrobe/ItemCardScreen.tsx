import { useApp } from "@/app/AppContext";
import { useItemDetail } from "@/api/useShineData";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import Notice from "@/components/ui/Notice";
import StatusBar from "@/components/layout/StatusBar";

export default function ItemCardScreen() {
  const ctx = useApp();
  const id = ctx.params.id;
  const { data: item, source } = useItemDetail(id);

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
        <div style={{ display: "flex", gap: 20 }}>
          <button
            style={{
              color: "#6A6865",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <I.Edit />
          </button>
          <button
            aria-label="Удалить вещь"
            disabled={!item}
            style={{
              color: "#6B1F2B",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => ctx.go("confirm-modal", id && `item:${id}`)}
          >
            <I.Trash />
          </button>
        </div>
      </div>
      {source === "error" && (
        <Notice>Не удалось загрузить вещь. Возможно, она удалена.</Notice>
      )}
      {item && (
        <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
          <Img
            src={item.img}
            alt={item.name}
            style={{ width: "100%", height: 300 }}
          />
          <div style={{ padding: "20px 24px" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 400,
                color: "#F3F0E9",
                marginBottom: 20,
              }}
            >
              {item.name}
            </div>
            {item.attrs.map((a, i) => (
              <div key={a.k}>
                {i > 0 && <Divider />}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "13px 0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#5A5855",
                      flexShrink: 0,
                    }}
                  >
                    {a.k}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#F3F0E9",
                      textAlign: "right",
                    }}
                  >
                    {a.v}
                  </div>
                </div>
              </div>
            ))}
            <Divider />
            <div style={{ paddingTop: 20 }}>
              <Caption style={{ marginBottom: 12 }}>
                Используется в образах
              </Caption>
              {item.outfits.length === 0 && (
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#5A5855",
                    padding: "8px 0",
                  }}
                >
                  Пока не используется в образах
                </div>
              )}
              {item.outfits.map((o, i) => (
                <button
                  key={o.id ?? i}
                  onClick={() => ctx.go("outfit-detail", o.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #1E1E1E",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: "#F3F0E9",
                    }}
                  >
                    {o.name}
                  </div>
                  <div style={{ color: "#3D3D3B" }}>
                    <I.ChevronRight />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
