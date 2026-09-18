import SourceNavigation from "../components/SourceNavigation.jsx";
import { ownerCopy } from "../data/copy.js";

/**
 * 차주가 화면 (탭 6번) — 차주 인증 및 구매 정보 등록.
 *
 * 구성: 보상 안내 카드 + 영수증 업로드 → 구매 정보 폼 → 비고 → 기타 정보.
 *
 * 폼은 fields 배열을 돌려 그린다.
 * 각 항목은 [라벨, 상태 필드명, 값, placeholder, 읽기전용여부] 튜플이고
 * 값은 state.ownerPage 에 저장된다.
 * (리뷰 화면 안의 차주 정보는 state.ownerInfo 로 별개다 — 혼동 주의)
 *
 * NOTE: 모든 행에 필수 표시 '*' 가 붙는다. 튜플의 readonly 자리는 있는데
 *       필수 여부 자리는 없어서, 선택 항목을 표현할 방법이 아직 없다.
 */
function OwnerScreen({ state, dispatch, onNavigate, onBack }) {
  const info = state.ownerPage;
  const fields = [
    [ownerCopy.model, "model", info.model, "차종을 선택하세요", false],
    [
      ownerCopy.barePrice,
      "barePrice",
      info.barePrice,
      "소수점 둘째 자리까지 입력 · 만원",
      false,
    ],
    [
      ownerCopy.totalPrice,
      "totalPrice",
      info.totalPrice,
      "소수점 둘째 자리까지 입력 · 만원",
      false,
    ],
    [
      ownerCopy.purchaseTime,
      "purchaseTime",
      info.purchaseTime,
      "시간을 선택하세요",
      false,
    ],
    [ownerCopy.location, "city", info.city, "", true],
  ];

  return (
    <>
      <SourceNavigation
        selectedIndex={6}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100vh-58px)] px-[9px] pt-[10px] pb-[24px] bg-[#eef1f8]">
        <section className="rounded-[14px] px-[14px] py-[17px] border-2 border-[#ffe39a] bg-[linear-gradient(#fff9e7_0_25%,#fff_54%)]">
          <h2 className="mb-[14px] text-[22px] relative after:content-[''] after:block after:w-[78px] after:h-[4px] after:mt-[-6px] after:bg-[#ffc928]">
            {ownerCopy.rewardTitle}
            <span className="inline-flex items-center justify-center w-[20px] h-[20px] ml-[5px] border-2 border-[#9ba1b0] rounded-full text-[#9ba1b0] text-[13px] align-[2px]">
              ?
            </span>
          </h2>
          <p className="my-[12px] text-[#2c3038] text-[15px] whitespace-nowrap">
            <b className="inline-flex w-[20px] h-[20px] items-center justify-center mr-[5px] rounded-full bg-[#ffca28] text-white">
              ✓
            </b>{" "}
            차주 인증이 완료되면, 차종별 친구들에게{" "}
            <strong className="text-[#e85032]">기여 포인트</strong>를 드려요
          </p>
          <p className="my-[12px] text-[#2c3038] text-[15px] whitespace-nowrap">
            <b className="inline-flex w-[20px] h-[20px] items-center justify-center mr-[5px] rounded-full bg-[#ffca28] text-white">
              ✓
            </b>{" "}
            구매 영수증 인증이 완료되면,{" "}
            <strong className="text-[#e85032]">300~500 코인</strong>을 드려요
          </p>
          <button className="w-full h-[160px] mt-[12px] border-2 border-dashed border-[#ffd35d] rounded-[9px] flex flex-col items-center justify-center gap-[6px] bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.95))] text-[#888f9f]">
            <span className="w-[52px] h-[52px] inline-flex items-center justify-center rounded-full bg-[#20242d] text-white text-[42px] leading-none">
              ＋
            </span>
            <strong className="text-[19px] font-medium">
              {ownerCopy.receiptUpload}
            </strong>
            <small className="text-[12px] text-[#c6cad5]">
              자동으로 인식해 드려요
            </small>
          </button>
        </section>
        <section className="rounded-[14px] bg-white mt-[10px] px-[14px] py-[13px]">
          {fields.map(([label, field, value, placeholder, readonly]) => (
            <label
              className="min-h-[57px] flex items-center gap-[5px]"
              key={field}
            >
              <strong className="flex-[0_0_112px] text-[#242731] text-[17px]">
                {label}
                <em className="ml-[3px]">*</em>
              </strong>
              <input
                className="flex-1 min-w-0 border-0 outline-none text-[#2a2d36] [font:inherit] text-right placeholder:text-[#c8ccd7]"
                value={value}
                placeholder={placeholder}
                readOnly={readonly}
                onChange={(e) =>
                  dispatch({
                    type: "SET_OWNER_PAGE_FIELD",
                    field,
                    value: e.target.value,
                  })
                }
              />
              <b className="text-[#aeb4c2] text-[25px] font-normal">›</b>
            </label>
          ))}
        </section>
        <section className="rounded-[14px] bg-white mt-[10px] px-[14px] pt-[17px] pb-[13px] min-h-[170px]">
          <h2 className="mb-[14px] text-[21px]">{ownerCopy.note}</h2>
          <textarea
            className="w-full border-0 outline-none resize-y min-h-[87px] p-0 text-[16px] leading-[1.6] text-[#343741] placeholder:text-[#c8ccd8]"
            value={info.note}
            placeholder="예: 서비스 비용 3,000원, 추가 장착 내비게이션 1,280원, 연간 주행거리와 정비 기록을 적어 주세요."
            onChange={(e) =>
              dispatch({
                type: "SET_OWNER_PAGE_FIELD",
                field: "note",
                value: e.target.value,
              })
            }
          />
        </section>
        <button className="w-full min-h-[58px] mt-[10px] px-[14px] flex items-center justify-between text-[#242731] text-left rounded-[14px] bg-white">
          <strong className="text-[20px]">{ownerCopy.otherInfo}</strong>
          <span className="text-[#aeb4c2] text-[15px]">
            (추가로 작성할수록 검토가 빨라져요) ▼
          </span>
        </button>
      </main>
    </>
  );
}

export default OwnerScreen;
