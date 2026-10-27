import { useApp } from "@/app/AppContext";
import { useOutfitDetail } from "@/api/useShineData";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import Notice from "@/components/ui/Notice";
import StatusBar from "@/components/layout/StatusBar";
import { I } from "@/components/icons";

export default function OutfitDetailScreen() {
  const ctx = useApp();
  const id = ctx.params.id;
  const { data: outfit, source } = useOutfitDetail(id);

  // Collage: cover large on the left, next two stacked on the right, the rest in a row below.
  const rest = outfit?.items.slice(1) ?? [];
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2);

  return (
    <div
      className="shine-style-0287"
    >
      <StatusBar />
      <div
        className="shine-style-0288"
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          disabled={!outfit}
          onClick={() => ctx.go("confirm-modal", id && `outfit:${id}`)}
          className="shine-style-0289"
        >
          Удалить
        </button>
      </div>
      {source === "error" && (
        <Notice>Не удалось загрузить образ. Возможно, он удалён.</Notice>
      )}
      {outfit && (
        <div  className="scrollbar-hide shine-style-0290">
          <div className="shine-style-0291">
            <div className="shine-style-0292">
              <Img
                src={outfit.cover}
                alt={outfit.name}
                className="shine-style-0293"
              />
              {side.length > 0 && (
                <div
                  className="shine-style-0294"
                >
                  {side.map((p, i) => (
                    <Img
                      key={p.id ?? i}
                      src={p.img}
                      alt={p.name}
                      className="shine-style-0295"
                    />
                  ))}
                </div>
              )}
            </div>
            {bottom.length > 0 && (
              <div
                className="shine-style-0296"
              >
                {bottom.map((p, i) => (
                  <Img
                    key={p.id ?? i}
                    src={p.img}
                    alt={p.name}
                    className="shine-style-0297"
                  />
                ))}
              </div>
            )}
          </div>
          <Divider />
          <div className="shine-style-0298">
            <div
              className="shine-style-0299"
            >
              {outfit.name}
            </div>
            <div
              className={["outfit-detail__subtitle", outfit.comment ? "outfit-detail__subtitle--with-comment" : "outfit-detail__subtitle--without-comment"].join(" ")}
            >
              {outfit.subtitle}
            </div>
            {outfit.comment && (
              <div
                className="shine-style-0300"
              >
                {outfit.comment}
              </div>
            )}
            <Divider />
            <div className="shine-style-0301">
              <Caption className="shine-style-0302">Вещи</Caption>
              {source === "api" && outfit.items.length < 2 && (
                <div
                  className="shine-style-0303"
                >
                  Часть вещей удалена из гардероба
                </div>
              )}
              {outfit.items.map((p, i) => (
                <button
                  key={p.id ?? i}
                  onClick={() => ctx.go("item-card", p.id)}
                  className="shine-style-0304"
                >
                  <Img
                    src={p.img}
                    alt={p.name}
                    className="shine-style-0305"
                  />
                  <div
                    className="shine-style-0306"
                  >
                    {p.name}
                  </div>
                  <span className="shine-style-0307">
                    <I.ChevronRight />
                  </span>
                </button>
              ))}
            </div>
            <div className="shine-style-0308">
              <Btn full onClick={() => ctx.go("outfit-loading")}>
                Повторить образ
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
