import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function RecognitionResultScreen() {
  const ctx = useApp();
  const attrs = [
    { k: "Категория", v: "Верх" },
    { k: "Тип", v: "Рубашка" },
    { k: "Цвет", v: "Белый" },
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
          gap: 12,
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Результат</Caption>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        <Img
          src={IMGS.itemWhiteShirt}
          alt="white shirt"
          style={{ width: "100%", height: 260 }}
        />
        <div style={{ padding: "20px 24px" }}>
          <Caption style={{ marginBottom: 16 }}>
            Характеристики · Нажмите для редактирования
          </Caption>
          {attrs.map((a, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: "#F3F0E9",
                    }}
                  >
                    {a.v}
                  </div>
                  <div style={{ color: "#3D3D3B" }}>
                    <I.Edit />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div style={{ padding: "16px 24px 28px" }}>
        <Btn full onClick={() => ctx.go("wardrobe-filled")}>
          Добавить в гардероб
        </Btn>
      </div>
    </div>
  );
}
