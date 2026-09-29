import PickerHeader from "../../components/PickerHeader.jsx";
import { dealerPickerCopy } from "../../data/copy.js";

/**
 * 차주가 화면의 구매 대리점 선택 (실제 앱의 '选择经销商').
 *
 * 앱은 고른 차량 브랜드와 구매 지역에 맞는 대리점 목록 끝에 '其他(기타)'를
 * 붙인다. 차량을 고르기 전에는 이 화면이 열리지 않는다(차주가 화면이 막는다).
 * 행 높이 56 · 글자 16px · 구분선은 화면 끝까지 이어진다.
 *
 * 대리점 목록은 실제 데이터가 없어 브랜드·지역 이름으로 만든 더미다.
 * (기기에서 확인한 지역에는 대리점이 없어 '其他' 하나만 나왔다)
 */
function DealerPickerScreen({ state, dispatch }) {
  const { brand, city, dealer: selected } = state.ownerPage;
  const area = city || "시내";
  const dealers = [
    `${brand} ${area} 1호 전시장`,
    `${brand} ${area} 2호 전시장`,
    `${brand} ${area} 서비스센터`,
    dealerPickerCopy.other,
  ];

  return (
    <section className="min-h-dvh bg-white">
      <div className="sticky top-0 z-[3]">
        <PickerHeader
          title={dealerPickerCopy.title}
          onBack={() => dispatch({ type: "BACK" })}
        />
      </div>
      <main>
        {dealers.map((name) => (
          <button
            key={name}
            className={`w-full h-[56px] px-[16px] flex items-center border-b-[0.5px] border-[#e6e8f2] text-left text-[16px] ${
              name === selected ? "text-[#d18700]" : "text-[#1f2129]"
            }`}
            onClick={() => dispatch({ type: "SELECT_DEALER", value: name })}
          >
            {name}
          </button>
        ))}
      </main>
    </section>
  );
}

export default DealerPickerScreen;
