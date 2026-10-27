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
      className="shine-style-0447"
    >
      <StatusBar />
      <div
        className="shine-style-0448"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Результат</Caption>
      </div>
      <div  className="scrollbar-hide shine-style-0449">
        <Img
          src={IMGS.itemWhiteShirt}
          alt="white shirt"
          className="shine-style-0450"
        />
        <div className="shine-style-0451">
          <Caption className="shine-style-0452">
            Характеристики · Нажмите для редактирования
          </Caption>
          {attrs.map((a, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div
                className="shine-style-0453"
              >
                <div
                  className="shine-style-0454"
                >
                  {a.k}
                </div>
                <div className="shine-style-0455">
                  <div
                    className="shine-style-0456"
                  >
                    {a.v}
                  </div>
                  <div className="shine-style-0457">
                    <I.Edit />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="shine-style-0458">
        <Btn full onClick={() => ctx.go("wardrobe-filled")}>
          Добавить в гардероб
        </Btn>
      </div>
    </div>
  );
}
