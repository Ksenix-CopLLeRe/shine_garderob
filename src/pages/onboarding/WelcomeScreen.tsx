import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function WelcomeScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0131"
    >
      <StatusBar />
      <div
        className="shine-style-0132"
      >
        <div>
          <div
            className="shine-style-0133"
          >
            Что надеть
            <br />
            <em>сегодня?</em>
          </div>
          <div
            className="shine-style-0134"
          />
          <div
            className="shine-style-0135"
          >
            Shine подбирает образы из вашего гардероба с учётом погоды, ситуации
            и личного стиля.
          </div>
        </div>

        {/* Editorial image pair */}
        <div className="shine-style-0136">
          <Img
            src={IMGS.editorialBlazer}
            alt="fashion editorial"
            className="shine-style-0137"
          />
          <Img
            src={IMGS.editorialBWCoat}
            alt="fashion editorial"
            className="shine-style-0138"
          />
          <div
            className="shine-style-0139"
          />
        </div>

        <div className="shine-style-0140">
          <Btn full onClick={() => ctx.go("personalize")}>
            Начать
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.go("situation")}>
            Попробовать без регистрации
          </Btn>
        </div>
      </div>
    </div>
  );
}
