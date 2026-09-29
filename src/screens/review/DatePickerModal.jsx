import BottomSheet from "../../components/BottomSheet.jsx";
import WheelPicker from "../../components/WheelPicker.jsx";
import {
  DELIVERY_MONTHS,
  DELIVERY_YEARS,
} from "../../data/saleOptions.js";

/**
 * 인도 시기(연/월) 선택 바텀시트.
 *
 * 판매글의 '인도 연월' 시트와 같은 부품(BottomSheet + WheelPicker)과 같은
 * 후보 목록(2026년 → 2000년, 1~12월)을 쓴다. 열 때 현재 값이 가운데 줄에
 * 오고, 바깥을 누르거나 Esc·×·브라우저 뒤로가기로 닫을 수 있다.
 *
 * 값이 확정되는 시점이 두 단계다.
 *   - SET_DATE_PART       : 휠을 돌리는 즉시 datePicker 임시값만 갱신
 *   - CONFIRM_DATE_PICKER : '확정'을 눌러야 ownerInfo.deliveryTime 에 반영
 * 그래서 닫기로 나가면 원래 값이 그대로 남는다.
 *
 * 렌더링 위치가 ReviewScreen 내부가 아니라 App.jsx 인 이유는
 * 화면 전체를 덮는 오버레이라서다.
 */
function DatePickerModal({ state, dispatch }) {
  const { year, month } = state.datePicker;
  return (
    <BottomSheet
      title="인도 시기"
      onClose={() => dispatch({ type: "CANCEL_DATE_PICKER" })}
      onConfirm={() => dispatch({ type: "CONFIRM_DATE_PICKER" })}
    >
      <WheelPicker
        columns={[
          { key: "year", items: DELIVERY_YEARS, value: year },
          { key: "month", items: DELIVERY_MONTHS, value: month },
        ]}
        onChange={(part, value) =>
          dispatch({ type: "SET_DATE_PART", part, value })
        }
      />
    </BottomSheet>
  );
}

export default DatePickerModal;
