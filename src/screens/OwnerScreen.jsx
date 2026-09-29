import SourceNavigation from "../components/SourceNavigation.jsx";
import { ownerCopy } from "../data/copy.js";
import InvoiceUploadBox from "./owner/InvoiceUploadBox.jsx";
import PurchaseDateSheet from "./owner/PurchaseDateSheet.jsx";
import {
  BoltIcon,
  CaretIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CoinIcon,
  HelpIcon,
} from "../components/icons.jsx";

/**
 * 차주가 화면 — 차주 인증 및 구매 정보 등록.
 *
 * 구성: 보상 안내(+영수증 업로드) → 구매 정보 → 비고 → 기타 정보.
 *
 * 구매 정보 5줄은 두 종류로 나뉜다. 실제 앱이 그렇게 구분한다.
 *   선택형(select) : 브랜드·차종 · 구매 시기 · 구매 지역 — 오른쪽에 '›' 가 붙고
 *                    값이 없으면 회색 안내 문구를 보여 준다. 누르는 줄이라
 *                    button 으로 그린다.
 *                      브랜드·차종 → 브랜드 → 차종 → 세부 모델 선택 화면
 *                      구매 시기   → 연·월·일 시트 (PurchaseDateSheet)
 *                      구매 지역   → 지역 선택 화면
 *   입력형(input)  : 차량 가격 · 실구매 가격 — 직접 타이핑하고 '만원' 단위가
 *                    뒤에 붙는다. '›' 는 없다.
 *
 * '기타 정보'는 접었다 펼 수 있는 묶음이고 앱처럼 기본은 접힘이다. 안에는
 * 결제 방식 칩 두 개와 구매 대리점 선택이 들어간다. 대리점은 브랜드마다
 * 달라서, 앱처럼 차량을 고르기 전에는 눌러도 열리지 않는다.
 *
 * 값은 state.ownerPage 에 저장된다.
 * (리뷰 화면 안의 차주 정보는 state.ownerInfo 로 별개다 — 혼동 주의)
 *
 * @param receipts / onAddReceipt / onRemoveReceipt  영수증 첨부 (App 이 소유)
 */
function OwnerScreen({
  state,
  dispatch,
  receipts,
  onAddReceipt,
  onRemoveReceipt,
  onNavigate,
  onBack,
}) {
  const info = state.ownerPage;

  const fields = [
    {
      label: ownerCopy.model,
      field: "model",
      kind: "select",
      onSelect: () => dispatch({ type: "OPEN_MODEL_PICKER", from: "owner" }),
    },
    { label: ownerCopy.barePrice, field: "barePrice", kind: "input" },
    { label: ownerCopy.totalPrice, field: "totalPrice", kind: "input" },
    {
      label: ownerCopy.purchaseTime,
      field: "purchaseTime",
      kind: "select",
      onSelect: () => dispatch({ type: "OPEN_OWNER_DATE", today: today() }),
    },
    {
      label: ownerCopy.location,
      field: "city",
      kind: "select",
      onSelect: () => dispatch({ type: "OPEN_CITY_PICKER", from: "owner" }),
    },
  ];

  const setField = (field, value) =>
    dispatch({ type: "SET_OWNER_PAGE_FIELD", field, value });

  return (
    <>
      <SourceNavigation
        screen={state.screen}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100dvh-58px)] px-[9px] pt-[10px] pb-[24px] bg-[#eef1f8]">
        <section className="rounded-[14px] px-[14px] py-[17px] bg-[linear-gradient(#fff6de_0_30%,#fff_62%)]">
          <h2 className="mb-[14px] text-[22px] relative after:content-[''] after:block after:w-[78px] after:h-[4px] after:mt-[-6px] after:bg-[#ffc928]">
            {ownerCopy.rewardTitle}
            <span className="ml-[5px] text-[#9ba1b0] align-[-2px]">
              <HelpIcon size={20} />
            </span>
          </h2>
          {/* 보상 안내 두 줄은 한 줄로 묶어 두면(nowrap) 번역문이 원문보다 길어서
              좁은 폰(360px)에서 배지가 화면 밖으로 나가고 페이지 전체가 가로로
              밀린다. 문장은 줄바꿈되게 두고, 배지만 쪼개지지 않게 묶는다. */}
          <p className="my-[12px] flex items-start gap-[5px] text-[#2c3038] text-[15px] leading-[22px]">
            <RewardCheck />
            <span className="min-w-0">
              차주 인증이 완료되면, 차종별 친구들에게{" "}
              {/* 빨간 리본 배지 — 오른쪽 끝을 접은 모양이라 clip-path 로 깎는다. */}
              <span
                className="inline-flex items-center gap-[3px] pl-[8px] pr-[12px] py-[2px] align-middle whitespace-nowrap bg-[linear-gradient(95deg,#ff7a2f,#ef2f2f)] text-white text-[13px] leading-[18px] font-bold"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, calc(100% - 7px) 50%, 100% 100%, 0 100%)",
                }}
              >
                <BoltIcon size={14} />
                {ownerCopy.rewardContribution}
              </span>
            </span>
          </p>
          <p className="my-[12px] flex items-start gap-[5px] text-[#2c3038] text-[15px] leading-[22px]">
            <RewardCheck />
            <span className="min-w-0">
              구매 영수증 인증이 완료되면,{" "}
              <span className="inline-flex items-center gap-[4px] align-middle whitespace-nowrap text-[#2c3038] text-[16px] font-bold">
                <CoinIcon size={18} />
                {ownerCopy.rewardCoin}
              </span>
            </span>
          </p>
          <InvoiceUploadBox
            receipts={receipts}
            onAdd={onAddReceipt}
            onRemove={onRemoveReceipt}
          />
        </section>

        <section className="rounded-[14px] bg-white mt-[10px] px-[14px] py-[13px]">
          {fields.map(({ label, field, kind, onSelect }) => {
            const fieldLabel = (
              <strong className="flex-[0_0_112px] text-[#242731] text-[17px]">
                {label}
                <em className="ml-[3px]">*</em>
              </strong>
            );
            return kind === "select" ? (
              <button
                type="button"
                className="w-full min-h-[57px] flex items-center gap-[5px] text-left"
                key={field}
                onClick={onSelect}
              >
                {fieldLabel}
                <span
                  className={`flex-1 min-w-0 text-right whitespace-nowrap overflow-hidden text-ellipsis text-[17px] ${
                    info[field] ? "text-[#2a2d36]" : "text-[#c8ccd7]"
                  }`}
                >
                  {info[field] || ownerCopy.selectHint}
                </span>
                <span className="text-[#aeb4c2]">
                  <ChevronRightIcon size={16} />
                </span>
              </button>
            ) : (
              <label
                className="min-h-[57px] flex items-center gap-[5px]"
                key={field}
              >
                {fieldLabel}
                <input
                  className="flex-1 min-w-0 border-0 outline-none text-[#2a2d36] text-[16px] text-right placeholder:text-[#c8ccd7]"
                  value={info[field]}
                  placeholder={ownerCopy.priceHint}
                  inputMode="decimal"
                  onChange={(e) => setField(field, e.target.value)}
                />
                <span className="text-[#9da3b2] text-[16px]">
                  {ownerCopy.priceUnit}
                </span>
              </label>
            );
          })}
        </section>

        <section className="rounded-[14px] bg-white mt-[10px] px-[14px] pt-[17px] pb-[13px] min-h-[170px]">
          <h2 className="mb-[14px] text-[21px]">{ownerCopy.note}</h2>
          <textarea
            className="w-full border-0 outline-none resize-y min-h-[87px] p-0 text-[16px] leading-[1.6] text-[#343741] placeholder:text-[#c8ccd8]"
            value={info.note}
            placeholder="예: 서비스 비용 3,000원, 추가 장착 내비게이션 1,280원, 연간 주행거리와 정비 기록을 적어 주세요."
            onChange={(e) => setField("note", e.target.value)}
          />
        </section>

        <section className="rounded-[14px] bg-white mt-[10px] px-[14px]">
          <button
            className="w-full min-h-[58px] flex items-center justify-between text-[#242731] text-left"
            aria-expanded={info.extraOpen}
            onClick={() => setField("extraOpen", !info.extraOpen)}
          >
            <strong className="text-[20px]">{ownerCopy.otherInfo}</strong>
            <span className="text-[#aeb4c2] text-[15px]">
              {ownerCopy.otherInfoHint}
              <span className="ml-[6px] text-[#1f2129] align-[1px]">
                <CaretIcon size={11} up={info.extraOpen} />
              </span>
            </span>
          </button>
          {info.extraOpen && (
            <div className="pb-[13px]">
              <div className="min-h-[57px] flex items-center gap-[8px]">
                <strong className="flex-1 text-[#242731] text-[17px]">
                  {ownerCopy.payment}
                </strong>
                {ownerCopy.paymentOptions.map((option) => (
                  <button
                    key={option}
                    className={`h-[36px] px-[20px] rounded-[7px] border text-[16px] ${
                      info.payment === option
                        ? "bg-[#fff8e5] border-[#ffcc32] text-[#1f2129]"
                        : "bg-[#f4f5fa] border-transparent text-[#3a3d46]"
                    }`}
                    aria-pressed={info.payment === option}
                    onClick={() => setField("payment", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="w-full min-h-[57px] flex items-center gap-[5px] text-left"
                onClick={() => {
                  if (info.model) dispatch({ type: "OPEN_DEALER_PICKER" });
                }}
              >
                <strong className="flex-none text-[#242731] text-[17px]">
                  {ownerCopy.dealer}
                </strong>
                <span
                  className={`flex-1 min-w-0 text-right whitespace-nowrap overflow-hidden text-ellipsis text-[17px] ${
                    info.dealer ? "text-[#2a2d36]" : "text-[#c8ccd7]"
                  }`}
                >
                  {info.dealer || ownerCopy.selectHint}
                </span>
                <span className="text-[#aeb4c2]">
                  <ChevronRightIcon size={16} />
                </span>
              </button>
            </div>
          )}
        </section>
      </main>
      {state.ownerDateSheet && (
        <PurchaseDateSheet
          value={state.ownerDateSheet}
          today={today()}
          onChange={(value) => dispatch({ type: "SET_OWNER_DATE", value })}
          onConfirm={() => dispatch({ type: "CONFIRM_OWNER_DATE" })}
          onClose={() => dispatch({ type: "CLOSE_OWNER_DATE" })}
        />
      )}
    </>
  );
}

/** 오늘 날짜. 구매 시기는 오늘까지만 고를 수 있다. */
function today() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

/** 보상 안내 줄머리의 노란 원형 체크. */
function RewardCheck() {
  return (
    <span className="mt-[2px]">
      <CheckCircleIcon size={18} />
    </span>
  );
}

export default OwnerScreen;
