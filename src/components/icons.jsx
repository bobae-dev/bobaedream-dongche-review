/**
 * 화면에서 쓰는 SVG 아이콘 모음.
 *
 * 유니코드 기호(‹ ⌕ ▱ …)는 기기·폰트마다 모양과 크기가 달라서 앱과 똑같이
 * 보이지 않는다. 그래서 실제 앱 캡처를 보고 선 아이콘으로 다시 그렸다.
 * 크기·색은 쓰는 곳에서 바꿀 수 있게 size / color 를 받는다. 기본값은 앱
 * 측정값이다.
 *
 * 모두 장식이라 aria-hidden 이고, 누르는 버튼 쪽에 aria-label 을 단다.
 */

/** 헤더 왼쪽 ← 화살표 (선택 화면들). 앱 측정값: 폭 20 · 높이 약 15. */
export function BackArrowIcon({ color = "#1f2129" }) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 8H1.5M8 1.5 1.5 8 8 14.5" />
    </svg>
  );
}

/** 검색창 돋보기. 앱 측정값: 약 12.5px. */
export function SearchIcon({ size = 13, color = "#1f2129" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="5.6" cy="5.6" r="4.6" />
      <path d="m9.1 9.1 3 3" />
    </svg>
  );
}
