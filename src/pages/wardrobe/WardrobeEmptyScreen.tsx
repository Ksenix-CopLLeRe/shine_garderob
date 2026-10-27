import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function WardrobeEmptyScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0459"
    >
      <StatusBar />
      <div className="shine-style-0460">
        <div
          className="shine-style-0461"
        >
          Гардероб
        </div>
      </div>
      <Divider />
      <div
        className="shine-style-0462"
      >
        <div
          className="shine-style-0463"
        />
        <div
          className="shine-style-0464"
        >
          Здесь пока пусто
        </div>
        <div
          className="shine-style-0465"
        >
          Добавьте первые вещи — Shine начнёт собирать образы из вашего
          гардероба
        </div>
        <Btn onClick={() => ctx.go("add-item")}>Добавить вещь</Btn>
      </div>
      <BottomNav active="wardrobe" />
    </div>
  );
}
