import { useApp } from "@/app/AppContext";
import { useItemDetail } from "@/api/useShineData";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import Notice from "@/components/ui/Notice";
import StatusBar from "@/components/layout/StatusBar";

export default function ItemCardScreen() {
  const ctx = useApp();
  const id = ctx.params.id;
  const { data: item, source } = useItemDetail(id);

  return (
    <div
      className="shine-style-0413"
    >
      <StatusBar />
      <div
        className="shine-style-0414"
      >
        <BackBtn onClick={() => ctx.back()} />
        <div className="shine-style-0415">
          <button
            className="shine-style-0416"
          >
            <I.Edit />
          </button>
          <button
            aria-label="Удалить вещь"
            disabled={!item}
            className="shine-style-0417"
            onClick={() => ctx.go("confirm-modal", id && `item:${id}`)}
          >
            <I.Trash />
          </button>
        </div>
      </div>
      {source === "error" && (
        <Notice>Не удалось загрузить вещь. Возможно, она удалена.</Notice>
      )}
      {item && (
        <div  className="scrollbar-hide shine-style-0418">
          <Img
            src={item.img}
            alt={item.name}
            className="shine-style-0419"
          />
          <div className="shine-style-0420">
            <div
              className="shine-style-0421"
            >
              {item.name}
            </div>
            {item.attrs.map((a, i) => (
              <div key={a.k}>
                {i > 0 && <Divider />}
                <div
                  className="shine-style-0422"
                >
                  <div
                    className="shine-style-0423"
                  >
                    {a.k}
                  </div>
                  <div
                    className="shine-style-0424"
                  >
                    {a.v}
                  </div>
                </div>
              </div>
            ))}
            <Divider />
            <div className="shine-style-0425">
              <Caption className="shine-style-0426">
                Используется в образах
              </Caption>
              {item.outfits.length === 0 && (
                <div
                  className="shine-style-0427"
                >
                  Пока не используется в образах
                </div>
              )}
              {item.outfits.map((o, i) => (
                <button
                  key={o.id ?? i}
                  onClick={() => ctx.go("outfit-detail", o.id)}
                  className="shine-style-0428"
                >
                  <div
                    className="shine-style-0429"
                  >
                    {o.name}
                  </div>
                  <div className="shine-style-0430">
                    <I.ChevronRight />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
