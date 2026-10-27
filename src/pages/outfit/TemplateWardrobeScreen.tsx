import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";
import { TEMPLATE_WARDROBE } from "@/data/wardrobe";

export default function TemplateWardrobeScreen() {
  const ctx = useApp();
  const items = TEMPLATE_WARDROBE;

  return (
    <div
      className="shine-style-0229"
    >
      <StatusBar />
      <div
        className="shine-style-0230"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Пример</Caption>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0231"
      >
        <div
          className="shine-style-0232"
        >
          Базовый гардероб
        </div>
        <div
          className="shine-style-0233"
        >
          5 вещей для любой ситуации
        </div>
        <div
          className="shine-style-0234"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={item.span ? "template-wardrobe__item template-wardrobe__item--wide" : "template-wardrobe__item"}
            >
              <Img
                src={item.img}
                alt={item.s}
                className={item.span ? "template-wardrobe__image template-wardrobe__image--wide" : "template-wardrobe__image"}
              />
              <div className="shine-style-0235">
                <Caption>{item.l}</Caption>
                <div
                  className="shine-style-0236"
                >
                  {item.s}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="shine-style-0237" />
      </div>
      <div className="shine-style-0238">
        <Btn full onClick={() => ctx.go("outfit-loading")}>
          Подобрать образ из этих вещей
        </Btn>
      </div>
    </div>
  );
}
