import { useEffect, useEffectEvent, useRef } from "react";
import { starFillPercent } from "../state/selectors.js";

/** 별 하나를 그리는 SVG polygon 좌표 (viewBox 0 0 100 100 기준). */
const STAR_POINTS = "50,5 61,38 95,38 68,58 79,91 50,71 21,91 32,58 5,38 39,38";

const STAR_SIZE = 31;
const STAR_GAP = 6;
/** 별 5개 + 사이 간격 4개 = 별 줄의 전체 너비. 팝업을 이 안에 가둘 때 쓴다. */
const ROW_WIDTH = STAR_SIZE * 5 + STAR_GAP * 4;
/** 팝업 너비를 고정해 두어야 화살표 위치를 계산할 수 있다.
 *  (테두리 2 + 좌우 패딩 8 + 버튼 58 × 2 + 버튼 사이 간격 6 = 132) */
const POPUP_WIDTH = 132;
const ARROW_SIZE = 10;
/** 팝업 테두리 두께. 화살표의 left 는 테두리 안쪽(패딩 박스) 기준이라 그만큼 뺀다. */
const POPUP_BORDER = 1;

/**
 * 0.5점 단위 별점 입력 위젯.
 *
 * 입력 흐름은 두 단계다.
 *   1) 별 N 을 누른다        → 그 별에 해당하는 두 후보를 띄운다
 *   2) 팝업에서 값을 고른다  → 이때 비로소 점수가 확정된다
 * 별을 누르는 것만으로는 점수가 바뀌지 않는다. 별 N 의 후보는 항상
 * [N-0.5, N] 이다 — 1번째 별이면 0.5/1.0, 2번째 별이면 1.5/2.0 …
 *
 * 팝업은 값을 고르거나, 바깥을 누르거나, Esc 를 누를 때 닫힌다.
 * 자동으로 닫히지 않는다 — 점수를 정하는 필수 단계라서 시간 제한을 두면
 * 선택을 방해한다.
 *
 * 채움 정도는 CSS가 아니라 SVG clipPath 의 rect 너비(= starFillPercent
 * 반환값)로 표현한다. clipId 에 index 가 들어가는 이유: 한 화면에 별점이
 * 6줄 있어서 clipPath id 가 겹치면 모든 줄이 첫 줄의 채움 비율을 따라간다.
 *
 * @param category      평가 항목 이름
 * @param index         화면 내 순번. clipPath id 충돌 방지용.
 * @param rating        현재 점수 (0~5)
 * @param popup         { starValue } 또는 null. 어느 별의 팝업이 열려 있는지.
 * @param onOpenPopup   별을 눌렀을 때 (category, starValue)
 * @param onPickRating  팝업에서 값을 골랐을 때 (category, value)
 * @param onClosePopup  팝업을 닫아야 할 때
 */
function StarRating({
  category,
  index,
  rating,
  popup,
  onOpenPopup,
  onPickRating,
  onClosePopup,
}) {
  const rootRef = useRef(null);

  // onClosePopup 은 부모가 매 렌더 새로 만드는 함수라 의존성에 넣으면
  // 리렌더마다 리스너를 다시 달게 된다. Effect Event 로 감싸 최신 함수를
  // 참조하되 구독은 팝업 열림 여부에만 반응하게 한다.
  const closePopup = useEffectEvent(() => onClosePopup());

  useEffect(() => {
    if (!popup) return undefined;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) closePopup();
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") closePopup();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popup]);

  // 팝업을 누른 별 위에 띄우되, 별 줄 밖으로 삐져나가지 않게 가둔다.
  // 그래서 양 끝 별에서는 팝업이 별 중앙에서 밀리고, 화살표만 별을 가리킨다.
  let popupLeft = 0;
  let arrowLeft = 0;
  if (popup) {
    const starCenter =
      (popup.starValue - 1) * (STAR_SIZE + STAR_GAP) + STAR_SIZE / 2;
    popupLeft = Math.max(
      0,
      Math.min(ROW_WIDTH - POPUP_WIDTH, starCenter - POPUP_WIDTH / 2),
    );
    arrowLeft = starCenter - popupLeft - ARROW_SIZE / 2 - POPUP_BORDER;
  }

  return (
    <div className="relative" ref={rootRef}>
      <div
        className="flex gap-[6px]"
        role="group"
        aria-label={`${category} 점수`}
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const percent = starFillPercent(rating, value);
          const clipId = `star-clip-${index}-${value}`;
          return (
            <span
              className="relative w-[31px] h-[31px] inline-block"
              key={value}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id={clipId}>
                    <rect width={percent} height="100" />
                  </clipPath>
                </defs>
                <polygon points={STAR_POINTS} fill="#e2e6ef" />
                <polygon
                  points={STAR_POINTS}
                  fill="#ffc928"
                  clipPath={`url(#${clipId})`}
                />
              </svg>
              <button
                className="absolute inset-0 z-[1]"
                aria-label={`${category} ${value - 0.5}점 또는 ${value}점 선택`}
                aria-haspopup="true"
                aria-expanded={popup?.starValue === value}
                onClick={() => onOpenPopup(category, value)}
              ></button>
            </span>
          );
        })}
      </div>
      {popup && (
        <div
          className="absolute bottom-[38px] z-[5] flex gap-[6px] p-[4px] border border-[#f0c33b] rounded-[4px] bg-white shadow-[0_2px_7px_rgba(0,0,0,0.08)]"
          style={{ left: popupLeft, width: POPUP_WIDTH }}
          role="group"
          aria-label={`${category} 점수 선택`}
        >
          {[popup.starValue - 0.5, popup.starValue].map((value) => (
            <button
              key={value}
              className={`relative z-[1] min-w-[58px] px-[7px] py-[5px] rounded-[3px] text-[#343741] text-[13px] whitespace-nowrap ${
                value === rating ? "bg-[#fff9e8]" : ""
              }`}
              onClick={() => onPickRating(category, value)}
            >
              <span className="text-[#ffc928] text-[19px] align-[-2px] mr-[2px]">
                ★
              </span>
              {value.toFixed(1)}점
            </button>
          ))}
          <span
            className="absolute bottom-[-6px] w-[10px] h-[10px] bg-white border-r border-b border-[#f0c33b] rotate-45"
            style={{ left: arrowLeft }}
            aria-hidden="true"
          ></span>
        </div>
      )}
    </div>
  );
}

export default StarRating;
