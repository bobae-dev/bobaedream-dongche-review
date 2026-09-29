import { useEffect, useRef, useState } from "react";

/**
 * 머리글자(또는 연식)로 묶인 긴 목록(지역·브랜드·세부 모델 선택)에서 "지금 보고 있는 그룹"을
 * 추적하고, 그룹으로 바로 이동하게 해 주는 훅. 오른쪽 IndexRail 과 짝을 이룬다.
 *
 * 목록은 페이지(document) 스크롤을 쓰고, 화면 위쪽에 높이 topHeight 인
 * 고정 머리글이 있다고 가정한다. 그 바로 아래에 걸친 그룹이 현재 그룹이다.
 *
 * 목록 끝의 짧은 그룹은 페이지가 먼저 끝나서 머리글 아래까지 올라오지 못한다.
 * 그런 그룹으로 이동하면 스크롤 위치만으로는 앞 그룹이 현재 그룹으로 잡히므로,
 * 페이지 맨 끝에 닿아 있는 동안은 방금 이동한 그룹을 그대로 표시한다.
 *
 * @param letters    화면에 그려진 그룹 키 배열 (순서대로). 여러 글자여도 된다.
 * @param topHeight  고정 머리글 높이(px). 이동할 때도 이만큼 띄운다.
 * @returns {{ activeLetter, groupRef, jumpTo }}
 *   groupRef(letter) 를 각 그룹 요소의 ref 에 붙인다.
 */
export function useGroupIndex(letters, topHeight) {
  const [activeLetter, setActiveLetter] = useState(letters[0] ?? null);
  const elementsRef = useRef({});
  // 방금 jumpTo 로 이동한 그룹. 페이지 끝에 닿아 있는 동안만 유효하다.
  const jumpedRef = useRef(null);
  // letters 배열이 매 렌더 새로 만들어져도 구독을 다시 하지 않도록 내용으로 비교한다.
  // 연식("2026") 처럼 여러 글자 키도 쓰므로 구분자를 넣어 합친다.
  const lettersKey = letters.join("|");

  useEffect(() => {
    const keys = lettersKey ? lettersKey.split("|") : [];
    function handleScroll() {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1;
      if (atBottom && jumpedRef.current) {
        setActiveLetter(jumpedRef.current);
        return;
      }
      jumpedRef.current = null;
      let current = keys[0] ?? null;
      for (const letter of keys) {
        const element = elementsRef.current[letter];
        if (element && element.getBoundingClientRect().top <= topHeight + 1) {
          current = letter;
        }
      }
      setActiveLetter(current);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lettersKey, topHeight]);

  function groupRef(letter) {
    return (element) => {
      elementsRef.current[letter] = element;
    };
  }

  function jumpTo(letter) {
    const element = elementsRef.current[letter];
    if (!element) return;
    window.scrollTo(
      0,
      element.getBoundingClientRect().top + window.scrollY - topHeight,
    );
    jumpedRef.current = letter;
    setActiveLetter(letter);
  }

  return { activeLetter, groupRef, jumpTo };
}
