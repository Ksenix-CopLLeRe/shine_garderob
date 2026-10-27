import { useApp } from "@/app/AppContext";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function RecognitionErrorScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0439"
    >
      <StatusBar />
      <div className="shine-style-0440">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0441"
      >
        <Placeholder
          label="Фото вещи"
          className="shine-style-0442"
        />
        <div
          className="shine-style-0443"
        />
        <div
          className="shine-style-0444"
        >
          Не удалось рассмотреть вещь
        </div>
        <div
          className="shine-style-0445"
        >
          Попробуйте сфотографировать вещь на светлом фоне, целиком.
        </div>
        <div className="shine-style-0446">
          <Btn full onClick={() => ctx.go("item-recognition")}>
            Сделать другое фото
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => ctx.go("item-recognition")}
          >
            Выбрать другое из галереи
          </Btn>
        </div>
      </div>
    </div>
  );
}
