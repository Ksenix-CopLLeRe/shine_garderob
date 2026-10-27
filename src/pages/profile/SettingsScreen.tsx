import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function SettingsScreen() {
  const ctx = useApp();
  const items = [
    { l: "Аккаунт", s: ctx.userName || "Алина" },
    { l: "Персонализация", s: "Стиль и предпочтения" },
    { l: "Погода / Город", s: "Москва" },
    { l: "Уведомления", s: "Включены" },
    { l: "Конфиденциальность", s: null },
    { l: "Обратная связь", s: null },
  ];

  return (
    <div
      className="shine-style-0266"
    >
      <StatusBar />
      <div
        className="shine-style-0267"
      >
        <BackBtn onClick={() => ctx.back()} />
        <div
          className="shine-style-0268"
        >
          Настройки
        </div>
      </div>
      <Divider />
      <div
        
        className="scrollbar-hide shine-style-0269"
      >
        {items.map((item, i) => (
          <button
            key={i}
            className="shine-style-0270"
          >
            <div>
              <div
                className="shine-style-0271"
              >
                {item.l}
              </div>
              {item.s && (
                <div
                  className="shine-style-0272"
                >
                  {item.s}
                </div>
              )}
            </div>
            <div className="shine-style-0273">
              <I.ChevronRight />
            </div>
          </button>
        ))}
        <div className="shine-style-0274">
          <button
            onClick={() => {
              ctx.setAuth(false);
              ctx.go("welcome");
            }}
            className="shine-style-0275"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}
