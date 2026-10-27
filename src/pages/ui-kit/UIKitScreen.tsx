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
      className="shine-style-0365"
    >
      <StatusBar />
      <div
        className="shine-style-0366"
      >
        <BackBtn onClick={() => ctx.back()} />
        <div
          className="shine-style-0367"
        >
          Shine UI Kit
        </div>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0368"
      >
        <section
          className="shine-style-0369"
        >
          <Caption className="shine-style-0370">01 — Цвета</Caption>
          <div className="shine-style-0371">
            {[
              { tone: "bg", l: "BG", b: true },
              { tone: "bg2", l: "BG2" },
              { tone: "bg3", l: "BG3" },
              { tone: "fg", l: "FG" },
              { tone: "fg2", l: "FG2" },
              { tone: "fg3", l: "FG3" },
              { tone: "accent", l: "Accent" },
              { tone: "accent2", l: "Accent2" },
              { tone: "border", l: "Border" },
            ].map((col) => (
              <div key={col.l} className="shine-style-0372">
                <div className={["ui-swatch", `ui-swatch--${col.tone}`, col.b && "ui-swatch--bordered"].filter(Boolean).join(" ")} />
                <div
                  className="shine-style-0373"
                >
                  {col.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="shine-style-0374"
        >
          <Caption className="shine-style-0375">02 — Типографика</Caption>
          <div className="shine-style-0376">
            {[
              {
                variant: "display",
                t: "Display",
                i: "Playfair · 50 · 400",
              },
              {
                variant: "heading-italic",
                t: "Heading Italic",
                i: "Playfair · 34 · Italic",
              },
              {
                variant: "section",
                t: "Section Title",
                i: "Playfair · 22 · 400",
              },
              {
                variant: "body-medium",
                t: "Body Medium",
                i: "DM Sans · 16 · 500",
              },
              {
                variant: "body-regular",
                t: "Body Regular",
                i: "DM Sans · 14 · 400",
              },
            ].map((ty, i) => (
              <div key={i}>
                <div className={`ui-type-sample ui-type-sample--${ty.variant}`}>
                  {ty.t}
                </div>
                <div
                  className="shine-style-0377"
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
          className="shine-style-0378"
        >
          <Caption className="shine-style-0379">03 — Отступы</Caption>
          <div className="shine-style-0380">
            {[4, 8, 12, 16, 24, 32, 40, 48, 64].map((s) => (
              <div
                key={s}
                className="shine-style-0381"
              >
                <div className={`ui-space-bar ui-space-bar--${s}`} />
                <div
                  className="shine-style-0382"
                >
                  {s}px
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="shine-style-0383"
        >
          <Caption className="shine-style-0384">04 — Кнопки</Caption>
          <div className="shine-style-0385">
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
          className="shine-style-0386"
        >
          <Caption className="shine-style-0387">05 — Теги и фильтры</Caption>
          <div className="shine-style-0388">
            <Tag>Обычный</Tag>
            <Tag active>Активный</Tag>
            <Tag>Работа</Tag>
            <Tag>Верх</Tag>
            <Tag active>Кэжуал</Tag>
          </div>
        </section>

        <section
          className="shine-style-0389"
        >
          <Caption className="shine-style-0390">06 — Изображения</Caption>
          <div className="shine-style-0391">
            <Img
              src={IMGS.itemWhiteShirt}
              alt="item"
              className="shine-style-0392"
            />
            <Img
              src={IMGS.editorialBlazer}
              alt="outfit"
              className="shine-style-0393"
            />
            <Placeholder label={"Фото\nпользователя"} className="shine-style-0394" />
          </div>
          <div
            className="shine-style-0395"
          >
            Img — реальные Unsplash фото · Ph — плейсхолдер для пользовательских
            фото
          </div>
        </section>

        <section
          className="shine-style-0396"
        >
          <Caption className="shine-style-0397">
            07 — Иконки (outline, 1.5px)
          </Caption>
          <div
            className="shine-style-0398"
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

        <section className="shine-style-0399">
          <Caption className="shine-style-0400">08 — Скругления</Caption>
          <div className="shine-style-0401">
            {[
              { radius: "none", l: "0px — основной" },
              { radius: "sm", l: "2px — мелкие" },
            ].map((c) => (
              <div key={c.l}>
                <div className={`ui-radius-sample ui-radius-sample--${c.radius}`} />
                <div
                  className="shine-style-0402"
                >
                  {c.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="shine-style-0403" />
      </div>
    </div>
  );
}
