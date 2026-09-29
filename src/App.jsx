import { useReducer, useState } from "react";

import BrandPickerScreen from "./screens/BrandPickerScreen.jsx";
import CityPickerScreen from "./screens/CityPickerScreen.jsx";
import EnergyScreen from "./screens/EnergyScreen.jsx";
import LongPostScreen from "./screens/LongPostScreen.jsx";
import NewsScreen from "./screens/NewsScreen.jsx";
import OwnerScreen from "./screens/OwnerScreen.jsx";
import QuestionScreen from "./screens/QuestionScreen.jsx";
import SaleScreen from "./screens/SaleScreen.jsx";
import DatePickerModal from "./screens/review/DatePickerModal.jsx";
import ReviewScreen from "./screens/review/ReviewScreen.jsx";
import { useHistoryBack } from "./hooks/useHistoryBack.js";
import { useMediaPicker } from "./hooks/useMediaPicker.js";
import { useScreenScroll } from "./hooks/useScreenScroll.js";
import { initialState } from "./state/initialState.js";
import { reduce } from "./state/reducer.js";
import { historyDepth } from "./state/screens.js";

/**
 * 앱의 루트 컴포넌트 — 상태 소유와 화면 라우팅을 맡는다.
 *
 * 화면 전환은 라우터 없이 state.screen 값에 따른 분기로 처리한다.
 * (URL 을 쓰지 않는 단일 페이지 구조라, 새로고침하면 처음 화면으로 돌아간다)
 * 브라우저 뒤로가기는 useHistoryBack 이 화면 깊이와 히스토리를 맞춰
 * 앱 안에서 한 단계씩 물러나게 한다. 화면이 바뀔 때의 스크롤 위치는
 * useScreenScroll 이 정한다(새 화면은 맨 위, 선택 화면에서 돌아오면 원래 자리).
 *
 * 상태는 세 군데로 나뉘어 있다.
 *   1) useReducer  : 폼 값과 현재 화면 등 앱 전역 상태 (state/reducer.js)
 *   2) useMediaPicker    : 리뷰 대표 사진, 소식 첨부 사진, 질문 첨부(사진·영상).
 *                          File 의 임시 URL 이라 해제가 필요해 리듀서에 넣지
 *                          않는다. 화면이 아닌 여기서 들고 있어야 탭을 옮겨도
 *                          첨부가 남는다.
 *   3) activeRatingPopup : 별점 말풍선. 어느 별의 후보를 띄우고 있는지만
 *                          담는 일시적 UI 상태라 역시 리듀서 바깥에 둔다.
 *
 * 탭 목록과 화면 간 부모 관계(뒤로가기 규칙)는 state/screens.js 에 있다.
 * 화면을 추가하면 거기와 아래 분기 두 곳을 고친다.
 */
export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [activeRatingPopup, setActiveRatingPopup] = useState(null);
  const cover = useMediaPicker();
  const newsPhotos = useMediaPicker({ multiple: true });
  const questionMedia = useMediaPicker({ multiple: true });
  const ownerReceipts = useMediaPicker({ multiple: true });

  useScreenScroll(state.screen);
  useHistoryBack(historyDepth(state), () => {
    setActiveRatingPopup(null);
    dispatch({ type: "HISTORY_BACK" });
  });

  // 별 N 을 누르면 [N-0.5, N] 후보를 띄운다. 이 시점에는 점수가 바뀌지 않고,
  // 팝업에서 골라야 확정된다. 같은 별을 다시 누르면 닫는다.
  function handleOpenRatingPopup(category, starValue) {
    setActiveRatingPopup((prev) =>
      prev && prev.category === category && prev.starValue === starValue
        ? null
        : { category, starValue },
    );
  }

  function handlePickRating(category, value) {
    dispatch({ type: "SET_RATING", category, value });
    setActiveRatingPopup(null);
  }

  function handleCloseRatingPopup() {
    setActiveRatingPopup(null);
  }

  function goBack() {
    dispatch({ type: "BACK" });
  }

  // 탭 바에서 탭을 눌렀을 때. 화면이 없는 탭(영상)은 SourceNavigation 이 거른다.
  function navigate(screen) {
    dispatch({ type: "OPEN_SCREEN", screen });
  }

  switch (state.screen) {
    case "review":
      return (
        <>
          <ReviewScreen
            state={state}
            dispatch={dispatch}
            activeRatingPopup={activeRatingPopup}
            onOpenRatingPopup={handleOpenRatingPopup}
            onPickRating={handlePickRating}
            onCloseRatingPopup={handleCloseRatingPopup}
            selectedCover={cover.items[0] ?? null}
            onCoverChange={cover.add}
            onRemoveCover={cover.clear}
            onNavigate={navigate}
            onBack={goBack}
          />
          {state.datePicker.open && (
            <DatePickerModal state={state} dispatch={dispatch} />
          )}
        </>
      );
    case "news":
      return (
        <NewsScreen
          state={state}
          dispatch={dispatch}
          photos={newsPhotos.items}
          onAddPhotos={newsPhotos.add}
          onRemovePhoto={newsPhotos.remove}
          onNavigate={navigate}
          onBack={goBack}
        />
      );
    case "question":
      return (
        <QuestionScreen
          state={state}
          dispatch={dispatch}
          attachments={questionMedia.items}
          onAddAttachments={questionMedia.add}
          onRemoveAttachment={questionMedia.remove}
          onNavigate={navigate}
          onBack={goBack}
        />
      );
    case "long-post":
      return (
        <LongPostScreen
          state={state}
          dispatch={dispatch}
          onNavigate={navigate}
          onBack={goBack}
        />
      );
    case "sale":
      return <SaleScreen state={state} dispatch={dispatch} onBack={goBack} />;
    case "owner":
      return (
        <OwnerScreen
          state={state}
          dispatch={dispatch}
          receipts={ownerReceipts.items}
          onAddReceipt={ownerReceipts.add}
          onRemoveReceipt={ownerReceipts.remove}
          onNavigate={navigate}
          onBack={goBack}
        />
      );
    case "energy":
      return (
        <EnergyScreen
          state={state}
          dispatch={dispatch}
          onNavigate={navigate}
          onBack={goBack}
        />
      );
    case "city-picker":
      return <CityPickerScreen dispatch={dispatch} />;
    default:
      return <BrandPickerScreen state={state} dispatch={dispatch} />;
  }
}
