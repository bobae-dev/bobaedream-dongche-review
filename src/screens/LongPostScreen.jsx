import ChipRow from "../components/ChipRow.jsx";
import SourceNavigation from "../components/SourceNavigation.jsx";
import { longPostCopy } from "../data/copy.js";
import { SHARED_TOPICS } from "../data/topics.js";

/** 하단 도구 버튼 라벨 → 아이콘 문자. 목록에 없는 라벨은 '⌕' 로 떨어진다. */
const LONG_POST_ICONS = { 표정: "☺", 사진: "▱", 가격: "￥" };

/**
 * 긴 글 작성 화면 (탭 4번).
 *
 * 첨부 도구 카드 없이 제목/본문 카드로 바로 시작한다.
 *
 * NOTE: 이 화면만 공용 ComposerFooter 를 쓰지 않고 푸터를 직접 그린다.
 *       상단 차량 줄은 완전히 같고 하단 버튼 줄만 다르다
 *       (고정 3개 → longPostCopy.bottomActions 4개).
 *       ComposerFooter 가 하단 버튼을 children/props 로 받게 바꾸면
 *       통합할 수 있는 중복이다.
 */
function LongPostScreen({ state, dispatch, onNavigate, onBack }) {
  return (
    <>
      <SourceNavigation
        selectedIndex={4}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100vh-58px-150px)] px-[9px] pt-[10px] pb-[170px] bg-[#eef1f8]">
        <section className="rounded-[14px] bg-white h-[355px] px-[17px] pt-[18px] pb-[15px]">
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
          <p className="mt-[7px] text-[#9fa5b5] text-[15px] whitespace-nowrap">
            <span className="mr-[4px] text-[20px]">♧</span>
            {longPostCopy.shareHint}
            <a className="text-[#2451c8] no-underline" href="#">
              {longPostCopy.shareLink}
            </a>
          </p>
        </section>
        <ChipRow
          icon="#"
          title={longPostCopy.topicTitle}
          items={SHARED_TOPICS}
        />
      </main>
      <footer className="fixed bottom-0 left-1/2 z-[4] w-[min(100%,430px)] -translate-x-1/2 bg-white shadow-[0_-2px_12px_rgba(32,39,63,0.05)]">
        <div className="h-[42px] flex items-center gap-[9px] px-[16px] text-[#20232b]">
          <span className="w-[20px] h-[20px] inline-flex items-center justify-center rounded-full bg-[#20232b] text-white text-[12px] font-bold">
            C
          </span>
          <strong className="text-[17px]">{longPostCopy.vehicle}</strong>
          <i className="inline-block w-px h-[17px] bg-[#d8dce6]"></i>
          <button
            className="text-[#c2c7d3] text-[24px] leading-none"
            aria-label="차량 닫기"
          >
            ×
          </button>
        </div>
        <nav
          className="h-[72px] flex items-center gap-[27px] px-[19px] text-[#6c7282]"
          aria-label="하단 메뉴"
        >
          {longPostCopy.bottomActions.map((label) => (
            <button
              className="text-inherit leading-none min-w-[34px] text-[28px] font-bold"
              aria-label={label}
              key={label}
            >
              {LONG_POST_ICONS[label] ?? "⌕"}
            </button>
          ))}
        </nav>
      </footer>
    </>
  );
}

export default LongPostScreen;
