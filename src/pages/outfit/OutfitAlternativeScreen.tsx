import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function OutfitAlternativeScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0149"
    >
      <StatusBar />
      <div
        className="shine-style-0150"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Вариант 2</Caption>
      </div>
      <div  className="scrollbar-hide shine-style-0151">
        <div className="shine-style-0152">
          <div className="shine-style-0153">
            <div
              className="shine-style-0154"
            >
              <Img
                src={IMGS.itemGraySuit}
                alt="gray suit"
                className="shine-style-0155"
              />
              <Img src={IMGS.itemJeansDetail} alt="jeans" className="shine-style-0156" />
            </div>
            <div
              className="shine-style-0157"
            >
              <Img
                src={IMGS.itemBeltDetail}
                alt="accessory"
                className="shine-style-0158"
              />
              <Img
                src={IMGS.itemLeatherShoes}
                alt="leather shoes"
                className="shine-style-0159"
              />
            </div>
          </div>
        </div>

        <div
          className="shine-style-0160"
        >
          <div
            className="shine-style-0161"
          >
            ● Рекомендации обновлены — теплее и базовее
          </div>
        </div>

        <div className="shine-style-0162">
          <div
            className="shine-style-0163"
          >
            Тёплый минимализм
          </div>
          <div
            className="shine-style-0164"
          >
            Серый жакет вместо рубашки — образ стал строже, но не потерял линию.
          </div>
          <div className="shine-style-0165">
            <Btn
              full
              onClick={() =>
                ctx.isAuth ? ctx.go("save-success") : ctx.go("save-guest")
              }
            >
              Сохранить образ
            </Btn>
            <Btn
              full
              variant="secondary"
              onClick={() => ctx.go("outfit-adjustments")}
            >
              Изменить ещё
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
