import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function SavedEmptyScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0309"
    >
      <StatusBar />
      <div className="shine-style-0310">
        <div
          className="shine-style-0311"
        >
          Образы
        </div>
      </div>
      <Divider />
      <div
        className="shine-style-0312"
      >
        <div
          className="shine-style-0313"
        />
        <div
          className="shine-style-0314"
        >
          Пока нет
          <br />
          сохранённых образов
        </div>
        <div
          className="shine-style-0315"
        >
          Подберите первый образ — Shine сохранит его в вашу коллекцию
        </div>
        <Btn onClick={() => ctx.go("situation")}>Подобрать первый образ</Btn>
      </div>
      <BottomNav active="outfits" />
    </div>
  );
}
