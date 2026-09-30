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
      color: "#3D6B3D",
      title: "Образ сохранён",
      sub: "Дождливый вторник добавлен",
    },
    {
      icon: <I.X />,
      color: "#6B1F2B",
      title: "Не удалось сохранить",
      sub: "Проверьте соединение",
    },
    {
      icon: <I.Info />,
      color: "#4A4845",
      title: "Вещь добавлена",
      sub: "Гардероб обновлён",
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
      }}
    >
      <StatusBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Системные состояния</Caption>
      </div>
      <div
        style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}
        className="scrollbar-hide"
      >
        <Caption style={{ marginBottom: 16 }}>Toast уведомления</Caption>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {toasts.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#141414",
                borderLeft: `2px solid ${t.color}`,
              }}
            >
              <div style={{ color: t.color, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#F3F0E9",
                    fontWeight: 500,
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#5A5855",
                    marginTop: 2,
                  }}
                >
                  {t.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ paddingTop: 24 }}>
          <Caption style={{ marginBottom: 16 }}>Inline состояния</Caption>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { c: "#3D6B3D", t: "Образ сохранён в коллекцию" },
              { c: "#6B1F2B", t: "Не удалось распознать вещь" },
              { c: "#4A4845", t: "Образ уже был сохранён ранее" },
            ].map((s, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: s.c,
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#F3F0E9",
                  }}
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
