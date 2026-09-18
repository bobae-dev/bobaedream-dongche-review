import SourceNavigation from "../../components/SourceNavigation.jsx";
import StarRating from "../../components/StarRating.jsx";
import { ratingDescription, reviewCategories } from "../../state/selectors.js";
import ModelCard from "./ModelCard.jsx";
import PhotoCard from "./PhotoCard.jsx";

/**
 * 리뷰 작성 화면 — 앱의 기본 화면(initialState.screen === "review").
 *
 * 구성 순서: 탭 바 → 헤더 → 진행 안내 → 차량 카드 → 종합 점수
 *            → 한줄 리뷰 → 대표 사진.
 *
 * 종합 점수(average)는 저장하지 않고 매 렌더마다 평가 항목 평균으로 계산한다.
 * 아직 매기지 않은 항목은 0점으로 합산되므로, 일부만 평가하면 평균이 낮게 나온다.
 * (원본 동작을 그대로 옮긴 것 — 의도된 차이인지는 확인 필요)
 *
 * 별점 팝업 상태와 대표 사진 상태는 모두 App.jsx 가 들고 있고
 * 이 화면은 props 로 받아 내려보내기만 한다.
 */
function ReviewScreen({
  state,
  dispatch,
  activeRatingPopup,
  onOpenRatingPopup,
  onPickRating,
  onCloseRatingPopup,
  selectedCover,
  onCoverChange,
  onRemoveCover,
  onNavigate,
  onBack,
}) {
  const categories = reviewCategories(state.model);
  const average = (
    categories.reduce(
      (sum, category) => sum + (state.ratings[category] || 0),
      0,
    ) / categories.length
  ).toFixed(2);

  return (
    <>
      <SourceNavigation
        selectedIndex={1}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <header className="h-[76px] flex items-center bg-[#f5f6fb]">
        <button
          className="w-[52px] text-[42px] leading-none text-[#11131a]"
          aria-label="닫기"
        >
          ×
        </button>
        <strong className="text-[27px] ml-[7px]">리뷰 작성</strong>
        <span className="ml-[14px] text-[30px]">⇄</span>
        <button className="ml-auto mr-[10px] px-[20px] py-[14px] rounded-[12px] bg-[#ffca28] text-[#17191e] text-[18px] font-bold">
          ◁ 게시
        </button>
      </header>
      <section className="h-[112px] pt-[4px] px-[16px] text-[#aeb3c2]">
        <div className="inline-block p-[8px] border border-[#f1ba25] rounded-[5px] text-[#777d8c] bg-[#fffdf4] text-[13px]">
          300자 이상 작성하면 더 많은 사람에게 노출돼요
        </div>
        <div className="flex items-center gap-[8px] mt-[12px] text-[#dfe3ee]">
          <span className="text-[#333b48] text-[20px]">▰</span>
          <span className="h-[8px] flex-1 bg-[repeating-linear-gradient(135deg,#e0e4ef_0_9px,transparent_9px_16px)]"></span>
          <span className="text-[22px]">♢</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span>리뷰 선정 기회</span>
          <span>베스트 리뷰 선정 시 더 많은 혜택</span>
        </div>
      </section>
      <ModelCard state={state} dispatch={dispatch} />
      <section className="mx-[9px] mb-[10px] px-[14px] py-[18px] rounded-[14px] bg-white">
        <div className="flex justify-between items-center">
          <h2 className="mb-[20px] text-[24px]">
            종합 점수{" "}
            {state.model && (
              <b className="text-[#ec4b2d] text-[23px] ml-[5px]">{average}점</b>
            )}
          </h2>
          <button className="text-[#a5abba] text-[16px]">ⓘ 점수 안내</button>
        </div>
        <div className="px-[10px] py-[15px] bg-[#fff9e8] text-[#474a52] flex justify-between text-[14px] mb-[12px]">
          점수는 어떻게 매기면 좋을까요? 한 번에 쉽게 작성해 보세요!{" "}
          <button aria-label="안내 닫기" className="text-[25px]">
            ×
          </button>
        </div>
        <div>
          {categories.map((category, index) => (
            <div
              className="flex justify-between items-center min-h-[53px] text-[#a4a9b8] text-[18px]"
              key={category}
            >
              <label>
                {category}
                <em className="ml-[3px]">*</em>
              </label>
              <span className="flex-1 ml-[8px] text-[#9da3b2] text-[16px] whitespace-nowrap">
                {ratingDescription(category, state.ratings[category] || 0)}
              </span>
              <StarRating
                category={category}
                index={index}
                rating={state.ratings[category] || 0}
                popup={
                  activeRatingPopup?.category === category
                    ? activeRatingPopup
                    : null
                }
                onOpenPopup={onOpenRatingPopup}
                onPickRating={onPickRating}
                onClosePopup={onCloseRatingPopup}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="mx-[9px] mb-[10px] px-[14px] py-[18px] rounded-[14px] bg-white min-h-[290px]">
        <h2 className="mb-[20px] text-[24px]">
          한줄 리뷰 <em>*</em>
        </h2>
        <textarea
          className="w-full min-h-[300px] border-0 outline-none resize-y text-[#444] text-[16px] leading-[1.6] placeholder:text-[#c9ceda]"
          value={state.comment}
          onChange={(e) =>
            dispatch({ type: "SET_COMMENT", value: e.target.value })
          }
          placeholder="차량의 특징과 실제 경험을 간단하게 작성해 주세요. 4.5점 이상 또는 3점 이하로 평가한 항목은 구체적인 이유를 함께 적어주시면 좋아요."
        />
        <div className="flex justify-between items-center text-[#9da3b1] text-[14px]">
          <span>
            <b className="text-[#ef8421] text-[17px]">30</b>자 이상 작성해야
            게시할 수 있어요
          </span>
          <button className="text-[#3156bd] text-[16px]">
            ⓘ 리뷰 작성 가이드
          </button>
        </div>
        <div className="mt-[14px] px-[10px] py-[14px] flex justify-between bg-[#fff9e8] text-[#4a4c55] text-[14px]">
          작성 가이드를 참고하면 더 좋은 리뷰를 쉽게 완성할 수 있어요!{" "}
          <button aria-label="안내 닫기" className="text-[22px]">
            ×
          </button>
        </div>
      </section>
      <PhotoCard
        selectedCover={selectedCover}
        onCoverChange={onCoverChange}
        onRemoveCover={onRemoveCover}
      />
      <div className="mx-[20px] mb-[28px] text-[#f04b31] text-[17px]">
        ⓘ 차량 사진을 추가해 주세요
      </div>
    </>
  );
}

export default ReviewScreen;
