import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Img from "@/components/ui/Img";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";
import { useSavedOutfits } from "@/api/useShineData";
import SavedEmptyScreen from "./SavedEmptyScreen";

export default function SavedOutfitsScreen() {
  const ctx = useApp();
  const { data, source } = useSavedOutfits();
  const outfits = data ?? [];

  if (source === "api" && outfits.length === 0) return <SavedEmptyScreen />;

  return (
    <div
      className="shine-style-0316"
    >
      <StatusBar />
      <div className="shine-style-0317">
        <div
          className="shine-style-0318"
        >
          Образы
        </div>
      </div>
      <Divider />
      <div
        
        className="scrollbar-hide shine-style-0319"
      >
        <div
          className="shine-style-0320"
        >
          {outfits.map((o, i) => (
            <button
              key={i}
              aria-label={`Открыть образ: ${o.n}`}
              onClick={() => ctx.go("outfit-detail", o.id)}
              className={o.big ? "saved-outfit-card saved-outfit-card--wide" : "saved-outfit-card"}
            >
              <Img
                src={o.img}
                alt={o.n}
                className={o.big ? "saved-outfit-card__image saved-outfit-card__image--wide" : "saved-outfit-card__image"}
              />
              <div className="shine-style-0321">
                <div
                  className={o.big ? "saved-outfit-card__title saved-outfit-card__title--wide" : "saved-outfit-card__title"}
                >
                  <span>{o.n}</span>
                  <span className="shine-style-0322">
                    <I.ChevronRight />
                  </span>
                </div>
                <div
                  className="shine-style-0323"
                >
                  {o.s} · {o.d}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="shine-style-0324" />
      </div>
      <BottomNav active="outfits" />
    </div>
  );
}
