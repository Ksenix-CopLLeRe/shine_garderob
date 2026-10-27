import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";
import { REPLACEMENT_OPTIONS } from "@/data/outfits";

export default function ReplaceItemScreen() {
  const ctx = useApp();
  const alts = REPLACEMENT_OPTIONS;

  return (
    <div
      className="shine-style-0205"
    >
      <StatusBar />
      <div
        className="shine-style-0206"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>Замена вещи</Caption>
      </div>
      <div
        
        className="scrollbar-hide shine-style-0207"
      >
        <div
          className="shine-style-0208"
        >
          Выберите замену для{" "}
          <span className="shine-style-0209">Белой рубашки</span> — применим её
          сразу
        </div>
        <div
          className="shine-style-0210"
        >
          <Img
            src={IMGS.itemWhiteShirt}
            alt="white shirt"
            className="shine-style-0211"
          />
          <div
            className="shine-style-0212"
          >
            <div
              className="shine-style-0213"
            >
              Текущая вещь
            </div>
            <div
              className="shine-style-0214"
            >
              Белая рубашка
            </div>
          </div>
        </div>
        <Caption className="shine-style-0215">
          Альтернативы из гардероба
        </Caption>
        <div
          className="shine-style-0216"
        >
          {alts.map((a, i) => (
            <button
              key={i}
              onClick={() => ctx.go("outfit-result")}
              className="shine-style-0217"
            >
              <Img
                src={a.img}
                alt={a.n}
                className="shine-style-0218"
              />
              <div
                className="shine-style-0219"
              >
                <span>{a.n}</span>
                <span className="shine-style-0220">
                  <I.ChevronRight />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
