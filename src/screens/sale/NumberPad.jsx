/**
 * 희망 판매가 입력용 숫자 키패드.
 *
 * 실제 앱은 시스템 키보드를 띄우지 않고 시트 안에 직접 키패드를 그린다.
 * 배치는 4열 × 4행이고, 오른쪽 한 칸은 위아래로 나뉘어
 * 위 절반이 지우기(⌫), 아래 절반이 확정이다.
 * 그래서 확정 버튼이 BottomSheet 의 공용 버튼이 아니라 이 격자 안에 들어간다.
 *
 * 입력 규칙: 소수점은 한 번만, 소수 둘째 자리까지.
 *
 * @param value      현재 입력값 (문자열)
 * @param onChange   숫자/소수점/지우기/비우기 후의 새 값
 * @param onConfirm  확정
 */
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "비우기"];

function NumberPad({ value, onChange, onConfirm }) {
  function press(key) {
    if (key === "비우기") return onChange("");
    if (key === ".") {
      if (value.includes(".")) return undefined;
      return onChange(value === "" ? "0." : `${value}.`);
    }
    const [, decimals] = value.split(".");
    if (decimals && decimals.length >= 2) return undefined;
    return onChange(value === "0" ? key : value + key);
  }

  const cell =
    "h-[56px] text-[22px] text-[#1f2129] border-r border-b border-[#eceef4]";

  return (
    <div className="border-t border-[#eceef4] grid grid-cols-4">
      <div className="col-span-3 grid grid-cols-3">
        {KEYS.map((key) => (
          <button
            key={key}
            className={`${cell} ${key === "비우기" ? "text-[17px]" : ""}`}
            onClick={() => press(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="grid grid-rows-2">
        <button
          className="h-[112px] border-b border-[#eceef4] text-[22px] text-[#1f2129]"
          aria-label="한 글자 지우기"
          onClick={() => onChange(value.slice(0, -1))}
        >
          ⌫
        </button>
        <button
          className={`h-[112px] text-[17px] font-bold ${
            value === ""
              ? "bg-[#f4f5fa] text-[#c8c9ce]"
              : "bg-[#ffcc32] text-[#1f2129]"
          }`}
          disabled={value === ""}
          onClick={onConfirm}
        >
          확정
        </button>
      </div>
    </div>
  );
}

export default NumberPad;
