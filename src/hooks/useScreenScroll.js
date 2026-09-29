import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * 화면이 바뀔 때 페이지 스크롤 위치를 정하는 훅.
 *
 * 모든 화면이 같은 document 스크롤을 쓰기 때문에, 그냥 두면 한 화면에서
 * 내려간 위치가 다음 화면에도 그대로 남는다(탭을 옮기면 새 화면이 중간부터
 * 보인다). 앱처럼 동작하도록 화면 단계(depth, state/screens.js)로 규칙을 둔다.
 *   - 더 깊이 들어가면(선택 화면 열기 등) 떠나는 화면의 위치를 기억하고
 *     새 화면은 맨 위에서 시작한다.
 *   - 뒤로 나오면(고르고 돌아오기 포함) 그 화면을 떠날 때의 위치로 되돌린다.
 *     브랜드 → 차종 → 세부 모델처럼 여러 단계여도 단계마다 제자리로 온다.
 *   - 같은 단계끼리 옮기면(탭 전환) 맨 위에서 시작한다.
 *
 * 스크롤 위치는 화면이 바뀌기 "전" 값이 필요한데, 새 화면이 그려진 뒤에는
 * 문서 높이가 달라져 브라우저가 이미 위치를 잘라 놓았을 수 있다. 그래서
 * 스크롤할 때마다 마지막 위치를 기억해 두고 그 값을 쓴다.
 *
 * 브라우저의 자동 스크롤 복원은 useHistoryBack 이 꺼 둔다.
 *
 * @param screen  현재 화면 (state.screen)
 * @param depth   현재 화면 단계 (screenDepth(state))
 */
export function useScreenScroll(screen, depth) {
  const lastScrollYRef = useRef(0);
  const prevRef = useRef({ screen, depth });
  // 떠난 화면별 위치. 더 깊이 들어갈 때 넣고, 그 화면으로 돌아오면 꺼낸다.
  const savedRef = useRef({});

  useEffect(() => {
    function handleScroll() {
      lastScrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 새 화면이 그려진 직후, 화면에 보이기 전에 위치를 맞춘다.
  useLayoutEffect(() => {
    const prev = prevRef.current;
    if (prev.screen === screen) return;
    prevRef.current = { screen, depth };

    const saved = savedRef.current;
    if (depth > prev.depth) {
      saved[prev.screen] = lastScrollYRef.current;
      window.scrollTo(0, 0);
    } else if (depth < prev.depth && saved[screen] !== undefined) {
      window.scrollTo(0, saved[screen]);
      delete saved[screen];
    } else {
      window.scrollTo(0, 0);
    }
    lastScrollYRef.current = window.scrollY;
  }, [screen, depth]);
}
