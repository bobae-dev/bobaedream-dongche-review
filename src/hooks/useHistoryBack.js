import { useEffect, useEffectEvent, useRef } from "react";

/**
 * 앱 안의 화면 깊이를 브라우저 히스토리와 맞춰, OS 뒤로가기(안드로이드
 * 뒤로 버튼, iOS 스와이프)가 페이지를 떠나지 않고 앱 안에서 한 단계 물러나게
 * 하는 훅.
 *
 * 라우터 없이 state.screen 으로만 화면을 바꾸는 구조라 URL 은 그대로 두고,
 * 깊이만큼 history.pushState 로 항목을 쌓는다. 각 항목의 state 에는
 * { appDepth } 를 적어 두어, 뒤로가기로 어느 깊이에 떨어졌는지 알 수 있다.
 *
 * 깊이가 바뀌는 길은 둘이다.
 *   1) 앱 안에서 바뀜 (화면 열기, ‹ 버튼, 시트 닫기 등)
 *      → 늘면 pushState, 줄면 history.go(-n) 으로 히스토리를 따라 맞춘다.
 *        history.go 가 일으키는 popstate 는 우리가 낸 것이라 무시한다.
 *   2) 브라우저 뒤로가기
 *      → popstate 에서 물러난 단계 수만큼 onBack 을 부른다.
 *        onBack 은 깊이를 정확히 1 줄여야 한다.
 *
 * 앞으로가기는 되살릴 화면 정보가 없어서 바로 원래 자리로 되돌린다.
 *
 * 새로고침하면 히스토리 항목은 남는데 앱 상태는 처음(깊이 0)으로 돌아간다.
 * 그 상태로 두면 뒤로가기를 눌러도 한동안 아무 일이 없는 것처럼 보이므로,
 * 처음 뜰 때 남은 항목만큼 되돌아가 깊이 0 자리에 맞춘다.
 *
 * @param depth   현재 화면 깊이 (state/selectors.js 의 historyDepth)
 * @param onBack  뒤로가기 한 단계를 처리하는 함수
 */
export function useHistoryBack(depth, onBack) {
  // 지금 서 있는 히스토리 항목의 깊이. history.state.appDepth 와 같다.
  const pushedRef = useRef(0);
  // history.go 로 우리가 일으켜서 무시해야 할 popstate 수.
  const ignorePopRef = useRef(0);
  // StrictMode 는 개발 중 Effect 를 두 번 돌리므로, 새로고침 정리를 한 번만 하게 막는다.
  const restoredRef = useRef(false);
  const back = useEffectEvent(() => onBack());

  useEffect(() => {
    // 히스토리 이동 때 브라우저가 저장해 둔 스크롤 위치로 되돌리는 동작을 끈다.
    // 우리 항목은 URL 이 같아 브라우저가 저장한 위치가 화면과 맞지 않고,
    // 화면이 직접 되돌린 위치(예: 지역 선택을 닫을 때)를 history.go 가 뒤늦게
    // 덮어쓴다. 화면 전환 시 스크롤은 각 화면이 직접 관리한다.
    window.history.scrollRestoration = "manual";

    const leftover = window.history.state?.appDepth ?? 0;
    if (leftover > 0 && !restoredRef.current) {
      restoredRef.current = true;
      ignorePopRef.current += 1;
      window.history.go(-leftover);
    }

    function handlePopState(event) {
      const target = event.state?.appDepth ?? 0;
      if (ignorePopRef.current > 0) {
        ignorePopRef.current -= 1;
        pushedRef.current = target;
        return;
      }
      const steps = pushedRef.current - target;
      if (steps > 0) {
        pushedRef.current = target;
        for (let i = 0; i < steps; i += 1) back();
      } else if (steps < 0) {
        ignorePopRef.current += 1;
        window.history.go(steps);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const pushed = pushedRef.current;
    if (depth > pushed) {
      for (let next = pushed + 1; next <= depth; next += 1) {
        window.history.pushState({ appDepth: next }, "");
      }
    } else if (depth < pushed) {
      ignorePopRef.current += 1;
      window.history.go(depth - pushed);
    }
    pushedRef.current = depth;
  }, [depth]);
}
