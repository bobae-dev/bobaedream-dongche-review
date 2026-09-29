import { BackArrowIcon } from "./icons.jsx";

/**
 * 선택 화면(지역·브랜드·차종·세부 모델·대리점)의 상단 헤더.
 *
 * 실제 앱 측정값: 높이 42 · 가운데 제목 18px(#1f2129, 굵게) · 왼쪽 ← 화살표.
 * 스크롤해도 위에 붙어 있어야 하는 화면이 많아서 sticky 여부는 쓰는 쪽이
 * 감싸는 요소로 정한다(검색창 등 아래 요소와 함께 붙는 경우가 있어서다).
 *
 * @param title   가운데 제목
 * @param onBack  ← 를 눌렀을 때
 */
function PickerHeader({ title, onBack }) {
  return (
    <header className="relative h-[42px] flex items-center justify-center bg-white">
      <button
        className="absolute left-[10px] top-1/2 -translate-y-1/2 p-[4px]"
        aria-label="뒤로"
        onClick={onBack}
      >
        <BackArrowIcon />
      </button>
      <h1 className="text-[18px] font-semibold text-[#1f2129]">{title}</h1>
    </header>
  );
}

export default PickerHeader;
