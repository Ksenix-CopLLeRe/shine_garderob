import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Tag from "@/components/ui/Tag";
import StatusBar from "@/components/layout/StatusBar";

export default function UIKitScreen() {
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
          gap: 12,
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 400,
            color: "#F3F0E9",
          }}
        >
          Shine UI Kit
        </div>
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}
        className="scrollbar-hide"
      >
        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 16 }}>01 — Цвета</Caption>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { c: "#0D0D0D", l: "BG", b: true },
              { c: "#171717", l: "BG2" },
              { c: "#1D1D1D", l: "BG3" },
              { c: "#F3F0E9", l: "FG" },
              { c: "#8A8680", l: "FG2" },
              { c: "#4A4845", l: "FG3" },
              { c: "#6B1F2B", l: "Accent" },
              { c: "#8B2D3B", l: "Accent2" },
              { c: "#252525", l: "Border" },
            ].map((col) => (
              <div key={col.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: col.c,
                    border: col.b ? "1px solid #252525" : "none",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    color: "#5A5855",
                    marginTop: 5,
                  }}
                >
                  {col.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 20 }}>02 — Типографика</Caption>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                f: "'Playfair Display', serif",
                sz: 50,
                fw: 400,
                fi: false,
                t: "Display",
                i: "Playfair · 50 · 400",
              },
              {
                f: "'Playfair Display', serif",
                sz: 34,
                fw: 400,
                fi: true,
                t: "Heading Italic",
                i: "Playfair · 34 · Italic",
              },
              {
                f: "'Playfair Display', serif",
                sz: 22,
                fw: 400,
                fi: false,
                t: "Section Title",
                i: "Playfair · 22 · 400",
              },
              {
                f: "'DM Sans', sans-serif",
                sz: 16,
                fw: 500,
                fi: false,
                t: "Body Medium",
                i: "DM Sans · 16 · 500",
              },
              {
                f: "'DM Sans', sans-serif",
                sz: 14,
                fw: 400,
                fi: false,
                t: "Body Regular",
                i: "DM Sans · 14 · 400",
                c: "#8A8680",
              },
            ].map((ty, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: ty.f,
                    fontSize: ty.sz,
                    fontWeight: ty.fw,
                    fontStyle: ty.fi ? "italic" : "normal",
                    color: (ty as { c?: string }).c || "#F3F0E9",
                    lineHeight: 1,
                  }}
                >
                  {ty.t}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    color: "#3D3D3B",
                    marginTop: 4,
                  }}
                >
                  {ty.i}
                </div>
              </div>
            ))}
            <div>
              <Caption>Caption / Label · 10px · uppercase</Caption>
            </div>
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 16 }}>03 — Отступы</Caption>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[4, 8, 12, 16, 24, 32, 40, 48, 64].map((s) => (
              <div
                key={s}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: s,
                    height: 4,
                    background: "#6B1F2B",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#5A5855",
                  }}
                >
                  {s}px
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 16 }}>04 — Кнопки</Caption>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn full>Primary — Подобрать образ</Btn>
            <Btn full variant="secondary">
              Secondary — Другой вариант
            </Btn>
            <Btn full variant="ghost">
              Ghost — Пропустить
            </Btn>
            <Btn full variant="accent">
              Accent — Удалить
            </Btn>
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 14 }}>05 — Теги и фильтры</Caption>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Tag>Обычный</Tag>
            <Tag active>Активный</Tag>
            <Tag>Работа</Tag>
            <Tag>Верх</Tag>
            <Tag active>Кэжуал</Tag>
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 14 }}>06 — Изображения</Caption>
          <div style={{ display: "flex", gap: 8 }}>
            <Img
              src={IMGS.itemWhiteShirt}
              alt="item"
              style={{ width: 72, height: 90 }}
            />
            <Img
              src={IMGS.editorialBlazer}
              alt="outfit"
              style={{ width: 110, height: 90 }}
            />
            <Placeholder label={"Фото\nпользователя"} style={{ flex: 1, height: 90 }} />
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: "#3D3D3B",
              marginTop: 8,
            }}
          >
            Img — реальные Unsplash фото · Ph — плейсхолдер для пользовательских
            фото
          </div>
        </section>

        <section
          style={{ padding: "20px 0", borderBottom: "1px solid #1E1E1E" }}
        >
          <Caption style={{ marginBottom: 14 }}>
            07 — Иконки (outline, 1.5px)
          </Caption>
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              color: "#F3F0E9",
            }}
          >
            <I.Home />
            <I.Hanger />
            <I.Layers />
            <I.User />
            <I.Plus />
            <I.Camera />
            <I.Image />
            <I.Edit />
            <I.Trash />
            <I.ChevronRight />
            <I.ChevronLeft />
            <I.Check />
            <I.X />
            <I.Refresh />
            <I.Info />
          </div>
        </section>

        <section style={{ padding: "20px 0" }}>
          <Caption style={{ marginBottom: 14 }}>08 — Скругления</Caption>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { r: 0, l: "0px — основной" },
              { r: 2, l: "2px — мелкие" },
            ].map((c) => (
              <div key={c.l}>
                <div
                  style={{
                    width: 64,
                    height: 44,
                    background: "#1A1A1A",
                    borderRadius: c.r,
                    border: "1px solid #252525",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "#5A5855",
                    marginTop: 6,
                  }}
                >
                  {c.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
