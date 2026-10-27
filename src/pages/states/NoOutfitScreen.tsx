import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function NoOutfitScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0344"
    >
      <StatusBar />
      <div className="shine-style-0345">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0346"
      >
        <div className="shine-style-0347" />
        <div
          className="shine-style-0348"
        />
        <div
          className="shine-style-0349"
        >
          Сегодня гардероб немного ограничивает варианты
        </div>
        <div
          className="shine-style-0350"
        >
          Попробуем подобрать ближайший вариант или изменим условия.
        </div>
        <div className="shine-style-0351">
          <Btn full variant="secondary" onClick={() => ctx.go("situation")}>
            Изменить условия
          </Btn>
          <Btn full onClick={() => ctx.go("outfit-result")}>
            Посмотреть ближайший вариант
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.go("add-item")}>
            Добавить вещи
          </Btn>
        </div>
        <div className="shine-style-0352" />
      </div>
    </div>
  );
}
