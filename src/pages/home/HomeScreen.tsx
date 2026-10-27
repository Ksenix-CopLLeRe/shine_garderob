import { useApp } from "@/app/AppContext";
import { useSavedOutfits } from "@/api/useShineData";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeScreen({ name }: { name: string }) {
  const ctx = useApp();
  const { data: outfits, source } = useSavedOutfits();
  // Latest saved outfit from the API; the mock card stays when the API is unreachable.
  const latest =
    source === "api"
      ? outfits?.[0]
      : {
          id: undefined,
          n: "Дождливый вторник",
          s: "Учёба · 12° · сегодня",
          d: "",
          img: IMGS.editorialBlazer,
        };
  return (
    <div
      className="shine-style-0069"
    >
      <StatusBar />
      <div  className="scrollbar-hide shine-style-0070">
        <section className="shine-style-0071">
          <div
            className="shine-style-0072"
          >
            <div
              className="shine-style-0073"
            >
              Shine
            </div>
            <div
              className="shine-style-0074"
            >
              Москва · 12° · облачно
            </div>
          </div>
          <div
            className="shine-style-0075"
          >
            Доброе утро, {name}
          </div>
          <div
            className="shine-style-0076"
          >
            Что надеть <em>сегодня?</em>
          </div>
          <div className="shine-style-0077">
            <Img
              src={IMGS.editorialBlackJacket}
              alt="fashion editorial"
              className="shine-style-0078"
            />
            <div
              className="shine-style-0079"
            >
              <Img
                src={IMGS.editorialBWCoat}
                alt="fashion detail"
                className="shine-style-0080"
              />
              <div
                className="shine-style-0081"
              >
                <Caption className="shine-style-0082">На сегодня</Caption>
              </div>
            </div>
          </div>
          <div className="shine-style-0083">
            <Btn full onClick={() => ctx.go("situation")}>
              Подобрать образ
            </Btn>
          </div>
        </section>

        <Divider />

        <section className="shine-style-0084">
          <div
            className="shine-style-0085"
          >
            <div
              className="shine-style-0086"
            >
              Мои образы
            </div>
            <button
              onClick={() => ctx.go("saved-outfits")}
              className="shine-style-0087"
            >
              Все <I.ChevronRight />
            </button>
          </div>
          {latest && (
            <button
              onClick={() => ctx.go("outfit-detail", latest.id)}
              className="shine-style-0088"
            >
              <Img
                src={latest.img}
                alt={latest.n}
                className="shine-style-0089"
              />
              <div className="shine-style-0090">
                <div
                  className="shine-style-0091"
                >
                  {latest.n}
                </div>
                <div
                  className="shine-style-0092"
                >
                  {latest.d ? `${latest.s} · ${latest.d}` : latest.s}
                </div>
              </div>
              <div className="shine-style-0093">
                <I.ChevronRight />
              </div>
            </button>
          )}
        </section>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
