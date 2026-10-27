import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Btn from "@/components/ui/Btn";

export default function SaveSuccessScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0062"
    >
      {/* Background fashion image with overlay */}
      <img
        src={IMGS.editorialFieldDress}
        alt="fashion"
        className="shine-style-0063"
      />
      <div
        className="shine-style-0064"
      >
        <div
          className="shine-style-0065"
        />
        <div
          className="shine-style-0066"
        >
          Образ сохранён
        </div>
        <div
          className="shine-style-0067"
        >
          Дождливый вторник добавлен в вашу коллекцию
        </div>
        <div
          className="shine-style-0068"
        >
          <Btn full onClick={() => ctx.go("saved-outfits")}>
            Перейти к образам
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}
          >
            На главную
          </Btn>
        </div>
      </div>
    </div>
  );
}
