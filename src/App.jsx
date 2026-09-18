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
import { useMediaPicker } from "./hooks/useMediaPicker.js";
import { initialState } from "./state/initialState.js";
import { reduce } from "./state/reducer.js";

/**
 * 앱의 루트 컴포넌트 — 상태 소유와 화면 라우팅을 맡는다.
 *
 * 화면 전환은 라우터 없이 state.screen 값에 따른 분기로 처리한다.
 * (URL 을 쓰지 않는 단일 페이지 구조라, 새로고침하면 처음 화면으로 돌아간다)
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
 * TODO: navigate() 의 라벨→액션 매핑과 아래 화면 분기가 같은 화면 목록을
 *       두 번 적고 있다. 화면이 늘 때마다 두 곳을 함께 고쳐야 하므로
 *       screens/registry.js 같은 단일 목록으로 합치는 편이 낫다.
 */
export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [activeRatingPopup, setActiveRatingPopup] = useState(null);
  const cover = useMediaPicker();
  const newsPhotos = useMediaPicker({ multiple: true });
  const questionMedia = useMediaPicker({ multiple: true });

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

  function navigate(item) {
    switch (item) {
      case "소식":
        dispatch({ type: "OPEN_NEWS" });
        break;
      case "차량 점수":
        dispatch({ type: "OPEN_REVIEW" });
        break;
      case "질문":
        dispatch({ type: "OPEN_QUESTION" });
        break;
      case "긴 글":
        dispatch({ type: "OPEN_LONG_POST" });
        break;
      case "판매글":
        dispatch({ type: "OPEN_SALE" });
        break;
      case "차주가":
        dispatch({ type: "OPEN_OWNER" });
        break;
      case "에너지":
        dispatch({ type: "OPEN_ENERGY" });
        break;
      default:
        break;
    }
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
