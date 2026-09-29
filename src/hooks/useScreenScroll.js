import { useEffect, useLayoutEffect, useRef } from "react";

/** 연 화면 위에 잠깐 떴다가 돌아가는 선택 화면들. */
const PICKER_SCREENS = new Set(["brand-picker", "city-picker"]);

/**
 * 화면이 바뀔 때 페이지 스크롤 위치를 정하는 훅.
 *
 * 모든 화면이 같은 document 스크롤을 쓰기 때문에, 그냥 두면 한 화면에서
 * 내려간 위치가 다음 화면에도 그대로 남는다(탭을 옮기면 새 화면이 중간부터
 * 보인다). 앱처럼 동작하도록 규칙을 둔다.
 *   - 새 화면은 맨 위에서 시작한다.
 *   - 선택 화면(차량·지역)에서 그 화면을 연 화면으로 돌아오면, 열기 전의
 *     위치로 되돌린다. 고르고 돌아왔을 때 보던 자리가 그대로 있어야 해서다.
 *
 * 스크롤 위치는 화면이 바뀌기 "전" 값이 필요한데, 새 화면이 그려진 뒤에는
 * 문서 높이가 달라져 브라우저가 이미 위치를 잘라 놓았을 수 있다. 그래서
 * 스크롤할 때마다 마지막 위치를 기억해 두고 그 값을 쓴다.
 *
 * 브라우저의 자동 스크롤 복원은 useHistoryBack 이 꺼 둔다.
 *
 * @param screen  현재 화면 (state.screen)
 */
export function useScreenScroll(screen) {
  const lastScrollYRef = useRef(0);
  const prevScreenRef = useRef(screen);
  // 선택 화면을 열 때 기억한 { origin, scrollY }
  const savedRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      lastScrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 새 화면이 그려진 직후, 화면에 보이기 전에 위치를 맞춘다.
  useLayoutEffect(() => {
    const prev = prevScreenRef.current;
    if (prev === screen) return;
    prevScreenRef.current = screen;

    const saved = savedRef.current;
    if (PICKER_SCREENS.has(screen)) {
      savedRef.current = { origin: prev, scrollY: lastScrollYRef.current };
      window.scrollTo(0, 0);
    } else if (PICKER_SCREENS.has(prev) && saved?.origin === screen) {
      savedRef.current = null;
      window.scrollTo(0, saved.scrollY);
    } else {
      savedRef.current = null;
      window.scrollTo(0, 0);
    }
    lastScrollYRef.current = window.scrollY;
  }, [screen]);
}
