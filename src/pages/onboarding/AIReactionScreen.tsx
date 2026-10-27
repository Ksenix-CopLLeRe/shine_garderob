import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function AIReactionScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0094"
    >
      <StatusBar />
      <div
        className="shine-style-0095"
      >
        <Placeholder
          label="Фото пользователя"
          className="shine-style-0096"
        />
        <Caption className="shine-style-0097">Shine</Caption>
        <div
          className="shine-style-0098"
        >
          {[
            { t: "Ваааай, что за лев этот тигр", italic: true },
            {
              t: "Будем собирать образы, которые работают именно на вас",
              italic: false,
            },
          ].map((item, i) => (
            <div key={i} className="shine-style-0099">
              <div className="shine-style-0100" />
              <div
                className={["ai-reaction__quote", item.italic && "ai-reaction__quote--italic"].filter(Boolean).join(" ")}
              >
                {item.t}
              </div>
            </div>
          ))}
        </div>
        <Btn
          full
          onClick={() => {
            ctx.setAuth(true);
            ctx.go("home-auth");
          }}
        >
          Перейти в Shine
        </Btn>
      </div>
    </div>
  );
}
