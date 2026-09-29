import { useRef } from "react";

import { ownerCopy } from "../../data/copy.js";
import { CloseIcon, PlusIcon } from "../../components/icons.jsx";

/** 영수증 용지 양쪽에 뚫린 구멍 — 위아래로 같은 간격으로 반복한다. */
const PUNCH_HOLES = Array.from({ length: 7 });
/** 배경으로 깔리는 영수증 표의 행 라벨. 실제 내용이 아니라 형태만 흉내 낸다. */
const FORM_ROWS = ["기계 번호", "구매자", "차량 종류", "공급자", "합계 금액"];

/**
 * 구매 영수증 업로드 영역.
 *
 * 그냥 점선 상자가 아니라, 바탕에 영수증 용지를 흐리게 깔아 두고 그 위에
 * 검은 원형 ＋ 버튼과 안내 문구를 얹은 형태다. 양쪽 가장자리의 구멍과
 * 옅은 표 선이 '영수증'이라는 걸 알아보게 하는 장치라 같이 그렸다.
 *
 * 배경은 장식이라 aria-hidden 으로 감추고, 실제 조작은 ＋ 버튼 하나다.
 * 파일 input 은 숨겨 두고 버튼 클릭을 ref 로 위임한다(다른 화면과 같은 방식).
 *
 * @param receipts   업로드된 영수증 목록 [{ id, name, url }]
 * @param onAdd      파일 input 의 onChange
 * @param onRemove   한 장 삭제 (id)
 */
function InvoiceUploadBox({ receipts, onAdd, onRemove }) {
  const fileInputRef = useRef(null);

  return (
    <div className="relative mt-[12px] h-[190px] rounded-[9px] border border-dashed border-[#f0c97a] bg-[#fffdf7] overflow-hidden">
      {/* ── 배경: 영수증 용지 흉내 ── */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        <PunchStrip />
        <div className="relative flex-1 min-w-0 px-[10px] py-[12px]">
          {/* 원본 영수증에 찍혀 있는 붉은 직인. 제목 위에 살짝 겹친다. */}
          <span className="absolute left-1/2 top-[6px] -translate-x-1/2 w-[46px] h-[46px] rounded-full border-2 border-[#f2cfcb] rotate-[-12deg] flex items-center justify-center text-[7px] leading-[1.1] text-center text-[#f0cbc6]">
            세무
            <br />
            서장인
          </span>
          <div className="relative text-center text-[13px] tracking-[6px] text-[#efe3d0]">
            차량 매매 계산서
          </div>
          <div className="mt-[4px] text-right text-[8px] text-[#efe3d0]">
            발행번호 0000-00-0000
          </div>
          <div className="mt-[8px] border border-[#f6ece0]">
            {FORM_ROWS.map((row) => (
              <div
                className="flex h-[22px] border-b border-[#f6ece0] last:border-b-0"
                key={row}
              >
                <span className="flex-[0_0_88px] px-[6px] flex items-center border-r border-[#f6ece0] text-[8px] text-[#efe3d0]">
                  {row}
                </span>
                <span className="flex-1 px-[6px] flex items-center text-[8px] text-[#f3e8d8]">
                  00000000000000
                </span>
              </div>
            ))}
          </div>
        </div>
        <PunchStrip />
      </div>

      {/* ── 앞면: 실제 조작 ── */}
      {receipts.length > 0 ? (
        <div className="relative h-full flex items-center gap-[8px] px-[12px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {receipts.map((receipt) => (
            <div
              className="relative flex-[0_0_120px] h-[150px] rounded-[6px] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
              key={receipt.id}
            >
              <img
                className="w-full h-full object-cover block"
                src={receipt.url}
                alt={receipt.name}
                draggable={false}
              />
              <button
                className="absolute top-[3px] right-[3px] w-[22px] h-[22px] rounded-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center text-white"
                aria-label={`${receipt.name} 삭제`}
                onClick={() => onRemove(receipt.id)}
              >
                <CloseIcon size={12} weight={2.6} />
              </button>
            </div>
          ))}
          <button
            className="flex-[0_0_120px] h-[150px] rounded-[6px] border border-dashed border-[#e0c88f] bg-[rgba(255,255,255,0.7)] flex items-center justify-center text-[#b9a375]"
            aria-label="영수증 추가"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon size={28} weight={1.4} />
          </button>
        </div>
      ) : (
        <button
          className="relative w-full h-full flex flex-col items-center justify-center gap-[10px]"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="w-[34px] h-[34px] inline-flex items-center justify-center rounded-full bg-[#1f2129] text-white">
            <PlusIcon size={22} weight={2.4} />
          </span>
          <strong className="text-[17px] font-normal text-[#4a4d56]">
            {ownerCopy.receiptUpload}
          </strong>
        </button>
      )}
      <input
        ref={fileInputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        multiple
        aria-label="구매 영수증 추가"
        onChange={onAdd}
      />
    </div>
  );
}

/** 용지 좌우 가장자리의 구멍 띠. */
function PunchStrip() {
  return (
    <div className="flex-[0_0_18px] flex flex-col items-center justify-around py-[6px]">
      {PUNCH_HOLES.map((_, index) => (
        <i
          className="block w-[7px] h-[7px] rounded-full bg-[#f4f2f4]"
          key={index}
        ></i>
      ))}
    </div>
  );
}

export default InvoiceUploadBox;
