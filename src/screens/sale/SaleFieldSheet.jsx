import BottomSheet from "../../components/BottomSheet.jsx";
import WheelPicker from "../../components/WheelPicker.jsx";
import {
  DELIVERY_MONTHS,
  DELIVERY_YEARS,
  MILEAGE_CHEON,
  MILEAGE_MAN,
  MILEAGE_UNIT,
  TRANSFER_COUNTS,
} from "../../data/saleOptions.js";
import ColorGrid from "./ColorGrid.jsx";
import NumberPad from "./NumberPad.jsx";

/**
 * 판매글의 선택 필드를 편집하는 바텀시트.
 *
 * 어떤 필드를 눌렀느냐에 따라 본문이 세 종류로 갈린다.
 *   휠     : 인도 연월(2컬럼) · 주행거리(2컬럼 + 고정 단위) · 이전 횟수(1컬럼)
 *   칩     : 차량 색상
 *   키패드 : 희망 판매가
 * 껍데기(제목 바·확정 버튼)는 BottomSheet 가 공통으로 맡는다.
 *
 * 고른 값은 곧바로 반영되지 않고 draft 에 담겼다가 '확정'을 눌러야
 * state.sale 에 들어간다. 그래서 닫기로 나가면 원래 값이 남는다.
 *
 * 가격만 확정 버튼이 키패드 격자 안에 있어서 BottomSheet 의 공용 버튼을 끈다.
 *
 * @param field      편집 중인 필드 키
 * @param draft      편집 중인 값 (형태는 필드마다 다름)
 * @param onDraft    값이 바뀔 때
 * @param onConfirm  확정
 * @param onClose    닫기
 */
function SaleFieldSheet({ field, draft, onDraft, onConfirm, onClose }) {
  if (field === "color") {
    return (
      <BottomSheet
        title="차량 색상"
        onClose={onClose}
        onConfirm={onConfirm}
        confirmLabel="확정"
      >
        <div className="pt-[4px] pb-[4px]">
          <ColorGrid value={draft} onSelect={onDraft} />
        </div>
      </BottomSheet>
    );
  }

  if (field === "price") {
    return (
      <BottomSheet title="내 차 가격 정하기" onClose={onClose} confirmLabel="">
        <div className="h-[104px] flex items-center justify-center text-[24px]">
          {draft === "" ? (
            <span className="text-[#c8c9ce]">희망 판매가를 입력하세요</span>
          ) : (
            <span className="text-[#1f2129]">{draft}</span>
          )}
          <b className="ml-[2px] text-[#1f2129] font-bold">만원</b>
        </div>
        <NumberPad value={draft} onChange={onDraft} onConfirm={onConfirm} />
      </BottomSheet>
    );
  }

  const wheel = {
    delivery: {
      title: "인도 연월",
      columns: [
        { key: "year", items: DELIVERY_YEARS },
        { key: "month", items: DELIVERY_MONTHS },
      ],
    },
    mileage: {
      title: "현재 주행거리 선택",
      unit: MILEAGE_UNIT,
      columns: [
        { key: "man", items: MILEAGE_MAN },
        { key: "cheon", items: MILEAGE_CHEON },
      ],
    },
    transfers: {
      title: "소유권 이전 횟수",
      columns: [{ key: "count", items: TRANSFER_COUNTS }],
    },
  }[field];

  if (!wheel) return null;

  return (
    <BottomSheet
      title={wheel.title}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmLabel="확정"
    >
      <WheelPicker
        unit={wheel.unit}
        columns={wheel.columns.map((column) => ({
          ...column,
          value: draft[column.key] ?? column.items[0],
        }))}
        onChange={(key, value) => onDraft({ ...draft, [key]: value })}
      />
    </BottomSheet>
  );
}

export default SaleFieldSheet;
