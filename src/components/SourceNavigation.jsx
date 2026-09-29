import { useEffect } from "react";

import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../hooks/useDragScroll.js";
import { TABS } from "../state/screens.js";

/**
 * 화면 상단에 고정되는 가로 스크롤 탭 바.
 *
 * 탭 목록은 state/screens.js 의 TABS 가 원본이고, 현재 화면(screen)과
 * 같은 화면을 여는 탭이 선택 상태가 된다. 화면이 없는 탭(screen: null)은
 * 눌러도 아무 일이 없다.
 *
 * 탭이 화면보다 길어서 가로로 넘치므로 끌어서 스크롤할 수 있게 한다.
 * 그 동작은 useDragScroll 훅이 맡는다 — 드래그 끝의 의도치 않은 클릭을
 * 걸러내는 일까지 포함해서다.
 *
 * 선택 탭이 바뀌면 그 탭을 가로 중앙으로 스크롤해 준다.
 *
 * @param screen      현재 화면 (state.screen)
 * @param onNavigate  탭을 눌렀을 때 (열 화면 키)
 * @param onBack         좌측 '‹' 버튼
 */
function SourceNavigation({ screen, onNavigate, onBack }) {
  const {
    ref: tabsRef,
    onMouseDown: handleTabsMouseDown,
    isDragging,
    shouldIgnoreClick,
  } = useDragScroll();

  useEffect(() => {
    tabsRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "auto",
    });
  }, [screen, tabsRef]);

  function handleTabClick(tab) {
    if (shouldIgnoreClick()) return;
    if (tab.screen) onNavigate(tab.screen);
  }

  return (
    <nav
      className="sticky top-0 z-20 h-[58px] flex flex-nowrap items-center gap-[5px] pl-[3px] pr-[6px] bg-[#f5f6fb] shadow-[0_2px_8px_rgba(39,46,70,0.08)] overflow-hidden"
      aria-label="주요 메뉴"
    >
      <button
        className="flex-[0_0_34px] text-[36px] leading-none text-[#171a22]"
        aria-label="뒤로"
        onClick={onBack}
      >
        ‹
      </button>
      <div
        ref={tabsRef}
        onMouseDown={handleTabsMouseDown}
        className={`flex items-stretch gap-[2px] flex-1 min-w-0 ${DRAG_SCROLLER_CLASS} ${
          isDragging
            ? "cursor-grabbing [scroll-behavior:auto]"
            : "cursor-grab scroll-smooth"
        }`}
      >
        {TABS.map((tab) => (
          <button
            key={tab.label}
            data-selected={tab.screen === screen}
            className={`relative flex-none h-[58px] px-[6px] text-[12px] whitespace-nowrap ${
              tab.screen === screen
                ? "text-[#20242c] font-bold after:content-[''] after:absolute after:left-[28%] after:right-[28%] after:bottom-[7px] after:h-[3px] after:rounded-[3px] after:bg-[#ffca28]"
                : "text-[#747b8c]"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button className="flex-none px-[9px] py-[8px] rounded-[8px] bg-[#ffca28] text-[#17191e] text-[12px] font-bold whitespace-nowrap">
        ➤ 게시
      </button>
    </nav>
  );
}

export default SourceNavigation;
