/**
 * 글 작성 화면 하단에 고정되는 푸터.
 *
 * 연결된 차량 한 줄 + 도구 버튼 줄로 이루어진다.
 * 소식 / 질문 / 긴 글 화면이 공유한다. (원래 이름은 NewsFooter 였으나
 * 소식 전용이 아니라서 ComposerFooter 로 바꿨다)
 *
 * @param vehicleLabel  푸터에 표시할 차량 이름
 */
function ComposerFooter({ vehicleLabel }) {
  return (
    <footer className="fixed bottom-0 left-1/2 z-[4] w-[min(100%,430px)] -translate-x-1/2 bg-white shadow-[0_-2px_12px_rgba(32,39,63,0.05)]">
      <div className="h-[42px] flex items-center gap-[9px] px-[16px] text-[#20232b]">
        <span className="w-[20px] h-[20px] inline-flex items-center justify-center rounded-full bg-[#20232b] text-white text-[12px] font-bold">
          C
        </span>
        <strong className="text-[17px]">{vehicleLabel}</strong>
        <i className="inline-block w-px h-[17px] bg-[#d8dce6]"></i>
        <button
          className="text-[#c2c7d3] text-[24px] leading-none"
          aria-label="차량 닫기"
        >
          ×
        </button>
      </div>
      <nav
        className="h-[72px] flex items-center gap-[30px] px-[19px] text-[#6c7282]"
        aria-label="하단 메뉴"
      >
        <button
          className="text-inherit text-[32px] leading-none"
          aria-label="표정"
        >
          ☺
        </button>
        <button
          className="text-inherit text-[32px] leading-none"
          aria-label="통계"
        >
          ▥
        </button>
        <button
          className="text-inherit text-[32px] leading-none"
          aria-label="위치"
        >
          ⌖
        </button>
      </nav>
    </footer>
  );
}

export default ComposerFooter;
