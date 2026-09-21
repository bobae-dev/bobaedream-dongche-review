import { useEffect, useEffectEvent } from "react";

/**
 * 화면 아래에서 올라오는 바텀시트의 공통 껍데기.
 *
 * 판매글의 선택 필드 5개가 모두 이 틀을 쓴다. 안에 들어가는 내용만
 * 휠 / 색상 칩 / 숫자 키패드로 달라진다.
 *
 * 치수는 실제 앱을 픽셀 단위로 재서 맞췄다 (기기 1220px, density 480 →
 * device px ÷ 3 = CSS px).
 *   제목 바 48px · 확정 버튼 44px(좌우 16px) · 버튼 아래 여백 41px
 *   상단 모서리 9px · 오버레이 rgba(0,0,0,0.6)
 *
 * 확정 버튼은 confirmLabel 이 있을 때만 그린다. disabled 면 회색으로 죽인다
 * (가격 입력에서 값이 비었을 때가 그렇다).
 *
 * @param title         가운데 제목
 * @param onClose       × 또는 바깥/Esc 로 닫을 때
 * @param onConfirm     확정 버튼
 * @param confirmLabel  확정 버튼 문구. 없으면 버튼 자체를 그리지 않는다.
 * @param confirmDisabled 확정 버튼 비활성화 여부
 * @param children      시트 본문
 */
function BottomSheet({
  title,
  onClose,
  onConfirm,
  confirmLabel = "확정",
  confirmDisabled = false,
  children,
}) {
  // onClose 는 부모가 매 렌더 새로 만드는 함수라, Effect Event 로 감싸
  // 최신 함수를 참조하되 리스너는 한 번만 달리게 한다.
  const close = useEffectEvent(() => onClose());

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.6)] flex items-end"
      onClick={onClose}
    >
      <section
        className="w-[min(100%,var(--app-width))] mx-auto bg-white rounded-t-[9px] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // 시트 안을 눌렀을 때 바깥 클릭으로 닫히지 않도록 막는다.
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[48px] flex items-center justify-center">
          <strong className="text-[17px] text-[#1f2129]">{title}</strong>
          <button
            className="absolute right-[16px] text-[22px] leading-none text-[#1f2129]"
            aria-label="닫기"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
        {confirmLabel && (
          <div className="px-[16px] pt-[13px] pb-[41px]">
            <button
              className={`w-full h-[44px] rounded-[7px] text-[17px] font-bold ${
                confirmDisabled
                  ? "bg-[#f2f3f9] text-[#c8c9ce]"
                  : "bg-[#ffcc32] text-[#1f2129]"
              }`}
              disabled={confirmDisabled}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default BottomSheet;
