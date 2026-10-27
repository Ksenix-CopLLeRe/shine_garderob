import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function AddItemScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0404"
    >
      <StatusBar />
      <div className="shine-style-0405">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0406"
      >
        <div
          className="shine-style-0407"
        >
          Добавить вещь
        </div>
        <div
          className="shine-style-0408"
        >
          Shine распознает характеристики автоматически
        </div>
        <div className="shine-style-0409">
          {[
            { icon: <I.Camera />, l: "Сделать фото", s: "Откроется камера" },
            {
              icon: <I.Image />,
              l: "Выбрать из галереи",
              s: "Загрузить фото вещи",
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => ctx.go("item-recognition")}
              className="shine-style-0410"
            >
              {item.icon}
              <div>
                <div
                  className="shine-style-0411"
                >
                  {item.l}
                </div>
                <div
                  className="shine-style-0412"
                >
                  {item.s}
                </div>
              </div>
            </button>
          ))}
          <Divider />
        </div>
      </div>
    </div>
  );
}
