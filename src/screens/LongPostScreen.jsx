import ChipRow from "../components/ChipRow.jsx";
import ComposerFooter from "../components/ComposerFooter.jsx";
import SourceNavigation from "../components/SourceNavigation.jsx";
import { longPostCopy } from "../data/copy.js";
import { SHARED_TOPICS } from "../data/topics.js";
import {
  BulbIcon,
  EmojiIcon,
  HashIcon,
  PhotoIcon,
  PriceIcon,
  WrenchIcon,
} from "../components/icons.jsx";

/** 하단 도구 버튼 라벨 → 아이콘. 목록에 없는 라벨은 렌치(정비)로 떨어진다. */
const LONG_POST_ICONS = { 표정: EmojiIcon, 사진: PhotoIcon, 가격: PriceIcon };

/**
 * 긴 글 작성 화면.
 *
 * 첨부 도구 카드 없이 제목/본문 카드로 바로 시작한다.
 *
 * 하단 푸터는 공용 ComposerFooter 를 쓰되, 도구 줄만 이 화면의
 * 4개(longPostCopy.bottomActions)로 바꿔 넘긴다.
 */
function LongPostScreen({ state, dispatch, onNavigate, onBack }) {
  return (
    <>
      <SourceNavigation
        screen={state.screen}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100dvh-58px-150px)] px-[9px] pt-[10px] pb-[calc(170px_+_env(safe-area-inset-bottom))] bg-[#eef1f8]">
        <section className="rounded-[14px] bg-white min-h-[355px] px-[17px] pt-[18px] pb-[15px]">
          <input
            className="w-full border-0 outline-none bg-transparent text-[#343741] h-[42px] pb-[10px] border-b border-[#e2e5ec] text-[21px] font-bold placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.longPost.title}
            placeholder={longPostCopy.titlePlaceholder}
            aria-label="긴 글 제목"
            onChange={(e) =>
              dispatch({
                type: "SET_LONG_POST_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
          />
          <textarea
            className="w-full border-0 outline-none bg-transparent text-[#343741] min-h-[245px] pt-[16px] pb-[8px] resize-none text-[17px] leading-[1.6] placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.longPost.body}
            placeholder={longPostCopy.bodyPlaceholder}
            aria-label="긴 글 본문"
            onChange={(e) =>
              dispatch({
                type: "SET_LONG_POST_FIELD",
                field: "body",
                value: e.target.value,
              })
            }
          />
          <p className="mt-[7px] text-[#9fa5b5] text-[15px]">
            <span className="mr-[4px] align-[-3px]">
              <BulbIcon size={18} />
            </span>
            {longPostCopy.shareHint}
            <button type="button" className="text-[#2451c8] whitespace-nowrap">
              {longPostCopy.shareLink}
            </button>
          </p>
        </section>
        <ChipRow
          icon={<HashIcon size={20} />}
          title={longPostCopy.topicTitle}
          items={SHARED_TOPICS}
        />
      </main>
      <ComposerFooter vehicleLabel={longPostCopy.vehicle}>
        <nav
          className="h-[72px] flex items-center gap-[27px] px-[19px] text-[#6c7282]"
          aria-label="하단 메뉴"
        >
          {longPostCopy.bottomActions.map((label) => (
            <button
              className="text-inherit min-w-[34px] flex justify-center"
              aria-label={label}
              key={label}
            >
              <ToolIcon label={label} />
            </button>
          ))}
        </nav>
      </ComposerFooter>
    </>
  );
}

function ToolIcon({ label }) {
  const Icon = LONG_POST_ICONS[label] ?? WrenchIcon;
  return <Icon size={28} />;
}

export default LongPostScreen;
