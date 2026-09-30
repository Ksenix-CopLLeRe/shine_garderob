import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function ItemCardScreen() {
  const ctx = useApp();
  const attrs = [
    { k: "Категория", v: "Верх" },
    { k: "Тип", v: "Жакет" },
    { k: "Цвет", v: "Чёрный" },
    { k: "Стиль", v: "Классический" },
    { k: "Сезон", v: "Демисезон" },
  ];

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
            style={{
              color: "#6B1F2B",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => ctx.go("confirm-modal")}
          >
            <I.Trash />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        <Img
          src={IMGS.itemBlackPeacoat}
          alt="black jacket"
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
            Чёрный жакет
          </div>
          {attrs.map((a, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "13px 0",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#5A5855",
                  }}
                >
                  {a.k}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#F3F0E9",
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
            {["Офисный день", "Деловая встреча"].map((n, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #1E1E1E",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#F3F0E9",
                  }}
                >
                  {n}
                </div>
                <div style={{ color: "#3D3D3B" }}>
                  <I.ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
