import type { Screen } from "@/navigation/screens";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function ProfileScreen() {
  const ctx = useApp();
  const name = ctx.userName || "Алина";

  return (
    <div
      className="shine-style-0251"
    >
      <StatusBar />
      <div  className="scrollbar-hide shine-style-0252">
        {/* Large editorial portrait */}
        <div className="shine-style-0253">
          <Img
            src={IMGS.portraitBlazer}
            alt="user portrait"
            className="shine-style-0254"
          />
          <div
            className="shine-style-0255"
          >
            <div
              className="shine-style-0256"
            >
              {name}
            </div>
            <div
              className="shine-style-0257"
            >
              Минимализм · Кэжуал · Работа
            </div>
          </div>
        </div>

        <div className="shine-style-0258">
          <div
            className="shine-style-0259"
          >
            {[
              { n: "24", l: "Вещей" },
              { n: "8", l: "Образов" },
              { n: "3", l: "Стиля" },
            ].map((s, i) => (
              <div
                key={i}
                className={["profile-stat", i < 2 && "profile-stat--divided"].filter(Boolean).join(" ")}
              >
                <div
                  className="shine-style-0260"
                >
                  {s.n}
                </div>
                <Caption className="shine-style-0261">{s.l}</Caption>
              </div>
            ))}
          </div>
          {[
            { l: "Предпочтения стиля", sc: "style-prefs" as Screen },
            { l: "Настройки", sc: "settings" as Screen },
          ].map((item) => (
            <button
              key={item.l}
              onClick={() => ctx.go(item.sc)}
              className="shine-style-0262"
            >
              <div
                className="shine-style-0263"
              >
                {item.l}
              </div>
              <div className="shine-style-0264">
                <I.ChevronRight />
              </div>
            </button>
          ))}
          <div className="shine-style-0265" />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
