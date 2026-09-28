import { useEffect } from "react";

/**
 * 이 훅을 쓰는 컴포넌트가 떠 있는 동안 뒤 페이지의 스크롤을 잠근다.
 *
 * 바텀시트·모달이 열려 있을 때 휠을 끝까지 돌리거나 오버레이를 쓸면
 * 스크롤이 뒤 페이지로 번져 화면이 같이 움직이는데, 앱에서는 그런 일이 없다.
 *
 * html 과 body 둘 다 잠그는 이유: 스크롤 주체가 브라우저마다 다르다
 * (iOS Safari 는 body 만 잠가서는 안 멈추는 경우가 있다).
 * 닫힐 때는 잠그기 전 값으로 되돌린다.
 */
export function useBodyScrollLock() {
  useEffect(() => {
    const targets = [document.documentElement, document.body];
    const previous = targets.map((element) => element.style.overflow);
    targets.forEach((element) => {
      element.style.overflow = "hidden";
    });
    return () => {
      targets.forEach((element, index) => {
        element.style.overflow = previous[index];
      });
    };
  }, []);
}
