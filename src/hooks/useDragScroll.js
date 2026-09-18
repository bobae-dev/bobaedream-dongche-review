import { useEffect, useRef, useState } from "react";

/** 드래그로 인정할 최소 이동 거리(px). 이보다 덜 움직이면 그냥 클릭으로 본다. */
const DRAG_THRESHOLD = 4;
/** 드래그가 끝난 뒤 클릭을 무시할 시간(ms). */
const CLICK_SUPPRESS_MS = 120;

/**
 * 가로 스크롤 영역에 붙이는 공통 클래스.
 *
 * 스크롤바를 감추는 선언이 브라우저마다 달라 세 가지를 함께 쓴다.
 *   [scrollbar-width:none]          — Firefox
 *   [-ms-overflow-style:none]       — 구형 Edge/IE
 *   [&::-webkit-scrollbar]:hidden   — Chrome/Safari
 * overscroll-behavior-inline:contain 은 끝까지 밀었을 때 스크롤이 바깥(페이지)
 * 으로 번지지 않게 막고, touch-action:pan-x 는 터치에서 가로 제스처만 받는다.
 * select-none 은 드래그 중 글자가 블록 선택되는 것을 막는다.
 */
export const DRAG_SCROLLER_CLASS =
  "overflow-x-auto select-none [overscroll-behavior-inline:contain] [touch-action:pan-x] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

/**
 * 마우스로 끌어서 가로 스크롤하는 동작을 붙여 주는 훅.
 *
 * 스크롤바를 감춘 가로 목록은 데스크톱에서 스크롤할 방법이 사실상 없다.
 * 세로 휠은 가로로 움직이지 않고, shift+휠은 아는 사람만 쓴다. 그래서
 * 직접 끌어서 움직일 수 있게 한다. (터치는 브라우저 기본 동작으로 이미 된다)
 *
 * mousemove / mouseup 을 대상 요소가 아니라 window 에 다는 이유는, 커서가
 * 영역 밖으로 나가도 드래그가 이어지고 밖에서 버튼을 떼도 끝나야 해서다.
 *
 * 주의: 스크롤 영역 안에 이미지나 링크가 있으면 브라우저의 기본 드래그
 * (dragstart)가 먼저 시작되어 스크롤이 도중에 끊긴다. 그런 요소에는
 * draggable={false} 를 붙여 둘 것.
 *
 * 끌어서 놓는 동작은 브라우저가 클릭으로도 해석하기 때문에, 목록 안에 누를 수
 * 있는 요소가 있으면 드래그 끝에 원치 않는 클릭이 발생한다. shouldIgnoreClick()
 * 으로 그 직후의 클릭 한 번을 걸러낸다.
 *
 * @returns {{ ref, onMouseDown, isDragging, shouldIgnoreClick }}
 *   ref / onMouseDown 은 스크롤될 요소에 그대로 붙인다.
 *   isDragging 은 커서 모양과 부드러운 스크롤 여부를 바꾸는 데 쓴다.
 */
export function useDragScroll() {
  const scrollerRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    function handleMouseMove(event) {
      const drag = dragRef.current;
      if (!drag) return;
      const distance = event.clientX - drag.startX;
      if (Math.abs(distance) > DRAG_THRESHOLD) drag.moved = true;
      if (!drag.moved) return;
      event.preventDefault();
      drag.scroller.scrollLeft = drag.startScroll - distance;
    }

    function handleMouseUp() {
      const drag = dragRef.current;
      if (!drag) return;
      if (drag.moved) {
        suppressClickRef.current = true;
        setTimeout(() => {
          suppressClickRef.current = false;
        }, CLICK_SUPPRESS_MS);
      }
      setIsDragging(false);
      dragRef.current = null;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  function handleMouseDown(event) {
    if (event.button !== 0) return;
    dragRef.current = {
      scroller: event.currentTarget,
      startX: event.clientX,
      startScroll: event.currentTarget.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  }

  /** 방금 끝난 드래그 때문에 발생한 클릭이면 true (그리고 표시를 지운다). */
  function shouldIgnoreClick() {
    if (!suppressClickRef.current) return false;
    suppressClickRef.current = false;
    return true;
  }

  return {
    ref: scrollerRef,
    onMouseDown: handleMouseDown,
    isDragging,
    shouldIgnoreClick,
  };
}
