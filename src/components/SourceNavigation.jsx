import { useEffect } from "react";

import { localizedCopy } from "../data/copy.js";
import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../hooks/useDragScroll.js";

/**
 * 화면 상단에 고정되는 가로 스크롤 탭 바.
 *
 * 탭 목록은 data/copy.js 의 localizedCopy.navigation 이 원본이고,
 * 어느 탭이 선택 상태인지는 각 화면이 selectedIndex 로 알려준다.
 *
 * 탭이 화면보다 길어서 가로로 넘치므로 끌어서 스크롤할 수 있게 한다.
 * 그 동작은 useDragScroll 훅이 맡는다 — 드래그 끝의 의도치 않은 클릭을
 * 걸러내는 일까지 포함해서다.
 *
 * selectedIndex 가 바뀌면 해당 탭을 가로 중앙으로 스크롤해 준다.
 *
 * @param selectedIndex  localizedCopy.navigation 기준 현재 탭 번호
 * @param onNavigate     탭을 눌렀을 때 (탭 라벨 문자열)
 * @param onBack         좌측 '‹' 버튼
 */
function SourceNavigation({ selectedIndex, onNavigate, onBack }) {
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
  }, [selectedIndex, tabsRef]);

  function handleTabClick(item) {
    if (shouldIgnoreClick()) return;
    onNavigate(item);
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
        {localizedCopy.navigation.map((item, index) => (
          <button
            key={item}
            data-selected={index === selectedIndex}
            className={`relative flex-none h-[58px] px-[6px] text-[12px] whitespace-nowrap ${
              index === selectedIndex
                ? "text-[#20242c] font-bold after:content-[''] after:absolute after:left-[28%] after:right-[28%] after:bottom-[7px] after:h-[3px] after:rounded-[3px] after:bg-[#ffca28]"
                : "text-[#747b8c]"
            }`}
            onClick={() => handleTabClick(item)}
          >
            {item}
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
