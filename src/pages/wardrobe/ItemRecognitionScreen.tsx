import { useState, useEffect } from "react";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function ItemRecognitionScreen() {
  const ctx = useApp();
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d >= 3 ? 1 : d + 1)), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="shine-style-0431"
    >
      <StatusBar />
      <div className="shine-style-0432">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0433"
      >
        <Img
          src={IMGS.itemWhiteShirt}
          alt="clothing item"
          className="shine-style-0434"
        />
        <div className="shine-style-0435">
          <div className="shine-style-0436">
            {[0, 1, 2].map((i) => (
              <div key={i} className={["recognition-loader__dot", i < dots && "recognition-loader__dot--active"].filter(Boolean).join(" ")} />
            ))}
          </div>
          <div
            className="shine-style-0437"
          >
            Определяем характеристики вещи
          </div>
        </div>
        <div className="shine-style-0438">
          <Btn small onClick={() => ctx.go("recognition-result")}>
            Показать результат
          </Btn>
        </div>
      </div>
    </div>
  );
}
