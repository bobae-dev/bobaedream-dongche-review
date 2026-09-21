import { CAR_COLORS } from "../../data/saleOptions.js";

/**
 * 차량 색상 선택 — 휠이 아니라 3열 칩 그리드다.
 *
 * 선택된 칩만 연노랑 배경 + 노란 테두리를 두르고, 나머지는 옅은 회색 배경이다.
 * 테두리 때문에 선택 칩이 1px 커지지 않도록 모든 칩에 투명 테두리를 깔아 둔다.
 *
 * @param value     현재 선택된 색상
 * @param onSelect  칩을 눌렀을 때
 */
function ColorGrid({ value, onSelect }) {
  return (
    <div
      className="px-[20px] grid grid-cols-3 gap-[8px]"
      role="radiogroup"
      aria-label="차량 색상"
    >
      {CAR_COLORS.map((color) => (
        <button
          key={color}
          role="radio"
          aria-checked={color === value}
          className={`h-[40px] rounded-[8px] border text-[16px] ${
            color === value
              ? "bg-[#fff8e5] border-[#ffcc32] text-[#1f2129]"
              : "bg-[#f4f5fa] border-transparent text-[#3a3d46]"
          }`}
          onClick={() => onSelect(color)}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

export default ColorGrid;
