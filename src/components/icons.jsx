/**
 * 화면에서 쓰는 SVG 아이콘 모음.
 *
 * 유니코드 기호(‹ ⌕ ▱ ☺ …)는 기기·폰트마다 모양과 크기가 달라서 앱과 똑같이
 * 보이지 않고, iOS 에서는 일부가 이모지로 바뀐다. 그래서 실제 앱 캡처를
 * 확대해 보고 같은 느낌의 선 아이콘으로 다시 그렸다.
 *
 * 규칙
 *   - 대부분 24 × 24 격자, 선 굵기 2, 끝·모서리 둥글게 (앱 아이콘이 그렇다)
 *   - size(한 변 px)와 color 를 받는다. 기본 색은 currentColor 라서
 *     감싸는 요소의 글자색을 따른다.
 *   - 모두 장식이라 aria-hidden 이다. 누르는 버튼 쪽에 aria-label 을 단다.
 *
 * 앱에 없는 기호(가격·정비 등)도 같은 규칙으로 그렸다.
 */

function Svg({ size, children, viewBox = "0 0 24 24", ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "none", display: "inline-block", verticalAlign: "middle" }}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ── 이동 · 닫기 ───────────────────────────────────────── */

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

/** ‹ 모양 뒤로 (탭 바 왼쪽). */
export function ChevronLeftIcon({ size = 24, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="2.2">
      <path d="M15 4 7 12l8 8" />
    </Svg>
  );
}

/** › 오른쪽 꺾쇠 (선택형 행 끝). */
export function ChevronRightIcon({ size = 16, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="m9 5 7 7-7 7" />
    </Svg>
  );
}

/** ✕ 닫기. 굵기로 큰 닫기(헤더)와 작은 닫기(칩·배너)를 나눈다. */
export function CloseIcon({ size = 24, color = "currentColor", weight = 2 }) {
  return (
    <Svg size={size} stroke={color} strokeWidth={weight}>
      <path d="M5 5l14 14M19 5 5 19" />
    </Svg>
  );
}

/** ⇄ 글 종류 바꾸기 (헤더 제목 옆). */
export function SwapIcon({ size = 24, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="M4 9h16l-4-4M20 15H4l4 4" />
    </Svg>
  );
}

/** ▶ 작은 채운 삼각형 ('체크인 장소 ▸' 처럼 제목 뒤). */
export function PlayTriangleIcon({ size = 10, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M2 1v8l6.5-4z" fill={color} />
    </svg>
  );
}

/** ▼ / ▲ 접기 표시. up 이면 위쪽. */
export function CaretIcon({ size = 12, color = "currentColor", up = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      aria-hidden="true"
      style={{ flex: "none", transform: up ? "rotate(180deg)" : undefined }}
    >
      <path d="M1.5 3.5h9L6 9.5z" fill={color} />
    </svg>
  );
}

/** 검색창 돋보기 (지역 선택). 앱 측정값: 약 12.5px. */
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

/* ── 글쓰기 도구 ──────────────────────────────────────── */

/** 종이비행기 — '게시' 버튼. */
export function SendIcon({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="M21 3 3 10.5l7 2.5M21 3l-5 18-6-8M21 3 10 13v6l2.5-3" />
    </Svg>
  );
}

/** ＋ 추가. 얇은 선이다(사진 추가 상자 등). */
export function PlusIcon({ size = 24, color = "currentColor", weight = 1.6 }) {
  return (
    <Svg size={size} stroke={color} strokeWidth={weight}>
      <path d="M12 4v16M4 12h16" />
    </Svg>
  );
}

/** 사진 액자에 반짝이 — 'AI로 이미지 만들기'. */
export function AiImageIcon({ size = 30, color = "#6b64ee" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="2.2">
      <path d="M14 4H4v16h14v-6" />
      <path d="M7 17l4-4 3 2 4-4" />
      <path d="M7.5 7.5v2" />
      <path
        d="M19 2.5c.3 1.8 1 2.5 2.5 2.8-1.5.3-2.2 1-2.5 2.7-.3-1.7-1-2.4-2.5-2.7 1.5-.3 2.2-1 2.5-2.8z"
        fill={color}
        strokeWidth="1"
      />
    </Svg>
  );
}

/** 사진 — '사진 추가', 도구 줄의 사진. */
export function PhotoIcon({ size = 24, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m21 16-5-5-8 8" />
    </Svg>
  );
}

/** 영상 — '영상 추가'. */
export function VideoIcon({ size = 24, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5v5l4.5-2.5z" fill={color} />
    </Svg>
  );
}

/** 웃는 얼굴 — 도구 줄 '표정'. 입은 채워져 있다(앱과 같다). */
export function EmojiIcon({ size = 30, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="9" cy="10" r="1" fill={color} stroke="none" />
      <circle cx="15" cy="10" r="1" fill={color} stroke="none" />
      <path d="M8 13.5h8a4 4 0 0 1-8 0z" fill={color} strokeWidth="1.2" />
    </Svg>
  );
}

/** 막대 그래프 — 도구 줄 '통계'. */
export function ChartIcon({ size = 30, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M3 20.5h18M6 20.5V12h3.5v8.5M9.5 20.5V5h4v15.5M13.5 20.5V9H17v11.5" />
    </Svg>
  );
}

/** 위치 핀 — '체크인 장소', '위치'. */
export function PinIcon({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

/** 지도 위 핀 — 도구 줄 '위치'. */
export function MapPinIcon({ size = 30, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="M12 16s-5-4.3-5-8.5a5 5 0 0 1 10 0c0 4.2-5 8.5-5 8.5z" />
      <circle cx="12" cy="7.5" r="1.8" />
      <path d="M4 15v5l5-2 3 2 3-2 5 2v-5" />
    </Svg>
  );
}

/** # 주제 — 기울어진 샵. */
export function HashIcon({ size = 22, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="2.4" strokeLinecap="butt">
      <path d="M10 3 7.5 21M17 3l-2.5 18M4 8.5h17M3 15.5h17" />
    </Svg>
  );
}

/** 전구 — '이런 내용을 공유하면 …' 안내. */
export function BulbIcon({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="1.8">
      <path d="M9 17h6M10 21h4" />
      <path d="M8.5 14.5A6.5 6.5 0 1 1 15.5 14.5c-.7.5-1 1.2-1 2v.5h-5v-.5c0-.8-.3-1.5-1-2z" />
      <path d="M10 7.5a2.5 2.5 0 0 1 2-1" />
    </Svg>
  );
}

/** ¥ 가격 — 긴 글 도구 줄. */
export function PriceIcon({ size = 28, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8.5 7 3.5 5 3.5-5M12 12v5.5M9 12.5h6M9 15h6" />
    </Svg>
  );
}

/** 렌치 — 긴 글 도구 줄 '정비'. */
export function WrenchIcon({ size = 28, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color}>
      <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8a2.1 2.1 0 0 1-3-3l8-8-1.5-1.5a4 4 0 0 1-5-5l2.5 2.5 2-.5.5-2z" />
    </Svg>
  );
}

/* ── 안내 · 상태 ──────────────────────────────────────── */

/** ⓘ 안내. */
export function InfoIcon({ size = 16, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.5" r="1" fill={color} stroke="none" />
    </Svg>
  );
}

/** ? 원 — '보상 안내' 도움말. */
export function HelpIcon({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7" />
      <circle cx="12" cy="17" r="1" fill={color} stroke="none" />
    </Svg>
  );
}

/** ✓ 체크 (선만). 체크박스·'선택됨' 표시. */
export function CheckIcon({ size = 14, color = "currentColor", weight = 2.6 }) {
  return (
    <Svg size={size} stroke={color} strokeWidth={weight}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

/** 노란 원 안의 흰 체크 — '보상 안내' 줄머리. */
export function CheckCircleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="11" fill="#ffc928" />
      <path
        d="m7.5 12.5 3 3 6-6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 번개 — '기여 포인트' 배지. 노랑→주황 그라데이션. */
export function BoltIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <defs>
        <linearGradient id="bolt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff36b" />
          <stop offset="1" stopColor="#ffb21e" />
        </linearGradient>
      </defs>
      <path d="M14 1 4 14h6.5L9 23l11-14h-7z" fill="url(#bolt-fill)" />
    </svg>
  );
}

/** 금화 — '300~500 코인'. */
export function CoinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <defs>
        <linearGradient id="coin-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd977" />
          <stop offset="1" stopColor="#eda32b" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#coin-fill)" />
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff3c4" strokeWidth="1.2" />
      <path
        d="M9 9.5h6M12 9.5V16"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** ◇ 마름모 — 리뷰 진행 막대 끝(베스트 리뷰). */
export function DiamondIcon({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="1.8">
      <path d="M12 3 20 12 12 21 4 12z" />
    </Svg>
  );
}

/** 자동차 옆모습 — 리뷰 차량 카드의 차량 자리. */
export function CarIcon({ size = 44, color = "#9aa1b1" }) {
  return (
    <Svg size={size} stroke={color} strokeWidth="1.6">
      <path d="M3 16.5v-3.2c0-.8.5-1.5 1.3-1.8L7 10.5l2.2-3.1c.4-.6 1-.9 1.7-.9h3.6c.7 0 1.3.3 1.7.8l2.3 3.2 1.8.6c.9.3 1.4 1.1 1.4 2v3.4H19" />
      <path d="M8.5 16.5h7M7 10.5h13" />
      <circle cx="6.5" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
    </Svg>
  );
}

/** 브랜드 동그라미 로고 — 글쓰기 푸터의 연결된 차량 앞 (앱의 'C' 로고 자리). */
export function VehicleBadgeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="12" fill="#20232b" />
      <path
        d="M15.5 8.2A5 5 0 1 0 15.5 15.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="15.7" cy="12" r="1.5" fill="#fff" />
    </svg>
  );
}
