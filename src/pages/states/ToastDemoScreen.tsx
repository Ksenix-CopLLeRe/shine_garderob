import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function ToastDemoScreen() {
  const ctx = useApp();
  const toasts = [
    {
      icon: <I.Check />,
      tone: "success",
      title: "Образ сохранён",
      sub: "Дождливый вторник добавлен",
    },
    {
      icon: <I.X />,
      tone: "accent",
      title: "Не удалось сохранить",
      sub: "Проверьте соединение",
    },
    {
      icon: <I.Info />,
      tone: "muted",
      title: "Вещь добавлена",
      sub: "Гардероб обновлён",
    },
  ];

  return (
    <div
      className="shine-style-0353"
    >
      <StatusBar />
      <div
        className="shine-style-0354"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Системные состояния</Caption>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0355"
      >
        <Caption className="shine-style-0356">Toast уведомления</Caption>
        <div
          className="shine-style-0357"
        >
          {toasts.map((t, i) => (
            <div
              key={i}
              className={`toast toast--${t.tone}`}
            >
              <div className="toast__icon">{t.icon}</div>
              <div>
                <div
                  className="shine-style-0358"
                >
                  {t.title}
                </div>
                <div
                  className="shine-style-0359"
                >
                  {t.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="shine-style-0360">
          <Caption className="shine-style-0361">Inline состояния</Caption>
          <div className="shine-style-0362">
            {[
              { tone: "success", t: "Образ сохранён в коллекцию" },
              { tone: "accent", t: "Не удалось распознать вещь" },
              { tone: "muted", t: "Образ уже был сохранён ранее" },
            ].map((s, i) => (
              <div
                key={i}
                className="shine-style-0363"
              >
                <div
                  className={`inline-status__dot inline-status__dot--${s.tone}`}
                />
                <div
                  className="shine-style-0364"
                >
                  {s.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
