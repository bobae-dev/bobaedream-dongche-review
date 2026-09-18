import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../hooks/useDragScroll.js";

/**
 * 제목 + 가로 칩 목록으로 이루어진 한 줄짜리 카드.
 *
 * 소식 화면의 '체크인 장소'와 '주제 추가', 질문·긴 글 화면의 '주제 추가'가
 * 아이콘·제목·항목만 다른 같은 구조여서 한 컴포넌트로 묶었다.
 *
 * 칩이 한 줄을 넘치면 가로로 스크롤되는데, 스크롤바를 감추는 디자인이라
 * 데스크톱에서는 끌어서 움직이는 방법밖에 없다. 그 동작은 useDragScroll 이
 * 맡는다. (터치는 브라우저 기본 동작으로 이미 스크롤된다)
 *
 * 칩은 아직 눌러도 아무 일이 없는 표시 전용이다. 나중에 선택 기능을 붙일 때는
 * 드래그 끝에 따라오는 클릭을 useDragScroll 의 shouldIgnoreClick() 으로
 * 걸러 줘야 한다.
 *
 * @param icon   제목 왼쪽 아이콘 문자
 * @param title  제목. 접근성 라벨로도 그대로 쓴다.
 * @param items  칩으로 그릴 문자열 배열
 */
function ChipRow({ icon, title, items }) {
  const {
    ref: chipsRef,
    onMouseDown: handleChipsMouseDown,
    isDragging,
  } = useDragScroll();

  return (
    <section
      className="rounded-[14px] bg-white h-[54px] mt-[10px] px-[12px] flex items-center overflow-hidden"
      aria-label={title}
    >
      <button className="flex-[0_0_91px] flex items-center gap-[5px] p-0 text-[#252830] whitespace-nowrap">
        <span className="text-[24px] leading-none">{icon}</span>
        <strong className="text-[16px]">{title}</strong>
        <b className="text-[18px] font-normal">›</b>
      </button>
      <div
        ref={chipsRef}
        onMouseDown={handleChipsMouseDown}
        className={`flex gap-[8px] min-w-0 ${DRAG_SCROLLER_CLASS} ${
          isDragging
            ? "cursor-grabbing [scroll-behavior:auto]"
            : "cursor-grab scroll-smooth"
        }`}
      >
        {items.map((item) => (
          <button
            className="flex-none h-[34px] px-[12px] rounded-[4px] bg-[#f3f5fa] text-[#747b8c] text-[14px] whitespace-nowrap"
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ChipRow;
