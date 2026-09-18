import { useRef } from "react";

import ChipRow from "../components/ChipRow.jsx";
import ComposerFooter from "../components/ComposerFooter.jsx";
import SourceNavigation from "../components/SourceNavigation.jsx";
import { questionCopy } from "../data/copy.js";
import { SHARED_TOPICS } from "../data/topics.js";
import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../hooks/useDragScroll.js";

/**
 * 질문 작성 화면 (탭 2번).
 *
 * 소식 화면과 뼈대가 거의 같고, 첨부가 사진/영상 두 갈래이며 본문 아래에
 * 글자 수 카운터(2000자)가 붙는다는 점이 다르다.
 *
 * 첨부 버튼은 둘이지만 목록은 하나다. 숨긴 <input type="file"> 을 accept 만
 * 다르게(image/* · video/*) 두 개 두고, 둘 다 같은 onAddAttachments 로
 * 보내서 고른 순서대로 한 줄에 쌓이게 했다. 사진인지 영상인지는 항목의
 * type 으로 갈라 <img> 또는 <video> 로 그린다.
 *
 * 첨부가 늘면 카드가 가로로 넘치므로 끌어서 스크롤할 수 있게 해 두었다.
 * 카드 안 버튼이 드래그 끝의 클릭에 반응하지 않도록 shouldIgnoreStripClick()
 * 으로 한 번 걸러낸다.
 *
 * NOTE: 본문 placeholder 만 data/copy.js 를 거치지 않고 리터럴로 남아 있다.
 */
function QuestionScreen({
  state,
  dispatch,
  attachments,
  onAddAttachments,
  onRemoveAttachment,
  onNavigate,
  onBack,
}) {
  const bodyLength = state.question.body.length;
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const {
    ref: stripRef,
    onMouseDown: handleStripMouseDown,
    isDragging: isStripDragging,
    shouldIgnoreClick: shouldIgnoreStripClick,
  } = useDragScroll();

  function openPicker(inputRef) {
    if (shouldIgnoreStripClick()) return;
    inputRef.current?.click();
  }

  return (
    <>
      <SourceNavigation
        selectedIndex={2}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100vh-58px-150px)] px-[9px] pt-[10px] pb-[170px] bg-[#eef1f8]">
        <section
          ref={stripRef}
          onMouseDown={handleStripMouseDown}
          className={`rounded-[14px] bg-white h-[112px] px-[9px] py-[10px] flex gap-[5px] ${DRAG_SCROLLER_CLASS} ${
            isStripDragging
              ? "cursor-grabbing [scroll-behavior:auto]"
              : "cursor-grab scroll-smooth"
          }`}
          aria-label="질문 첨부 도구"
        >
          <button
            className="flex-[0_0_96px] h-[92px] border border-dashed border-[#d8dce7] rounded-[9px] flex flex-col items-center justify-center gap-[8px] text-[#9ca2b2]"
            onClick={() => openPicker(photoInputRef)}
          >
            <span className="inline-flex items-center justify-center h-[28px] text-[34px] leading-none">
              ▱
            </span>
            <strong className="text-[14px] font-medium">
              {questionCopy.photoAction}
            </strong>
          </button>
          <button
            className="flex-[0_0_96px] h-[92px] border border-dashed border-[#d8dce7] rounded-[9px] flex flex-col items-center justify-center gap-[8px] text-[#9ca2b2]"
            onClick={() => openPicker(videoInputRef)}
          >
            <span className="inline-flex items-center justify-center h-[28px] text-[32px] leading-none">
              ▻
            </span>
            <strong className="text-[14px] font-medium">
              {questionCopy.videoAction}
            </strong>
          </button>
          {attachments.map((item) => (
            <div
              className="relative flex-[0_0_92px] h-[92px] rounded-[9px] overflow-hidden bg-[#20232b]"
              key={item.id}
            >
              {item.type.startsWith("video/") ? (
                <>
                  {/* #t=0.1 은 첫 프레임을 미리보기로 띄우기 위한 것.
                      없으면 재생 전까지 검은 화면만 보인다. */}
                  <video
                    className="w-full h-full object-cover block"
                    src={`${item.url}#t=0.1`}
                    preload="metadata"
                    muted
                    playsInline
                    aria-label={item.name}
                  />
                  <span className="absolute left-0 bottom-0 px-[5px] py-[2px] bg-[rgba(0,0,0,0.6)] text-white text-[11px]">
                    ▶ 영상
                  </span>
                </>
              ) : (
                <img
                  className="w-full h-full object-cover block"
                  src={item.url}
                  alt={item.name}
                  draggable={false}
                />
              )}
              <button
                className="absolute top-[3px] right-[3px] w-[22px] h-[22px] rounded-full bg-[rgba(0,0,0,0.6)] text-white text-[17px] leading-[18px]"
                aria-label={`${item.name} 삭제`}
                onClick={() => {
                  if (shouldIgnoreStripClick()) return;
                  onRemoveAttachment(item.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
          <input
            ref={photoInputRef}
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            aria-label="사진 추가"
            onChange={onAddAttachments}
          />
          <input
            ref={videoInputRef}
            className="sr-only"
            type="file"
            accept="video/*"
            multiple
            aria-label="영상 추가"
            onChange={onAddAttachments}
          />
        </section>
        <section className="rounded-[14px] bg-white h-[352px] mt-[10px] px-[17px] pt-[18px] pb-[13px]">
          <input
            className="w-full border-0 outline-none bg-transparent text-[#343741] h-[42px] pb-[10px] border-b border-[#eff0f4] text-[20px] font-medium placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.question.title}
            placeholder={questionCopy.titlePlaceholder}
            aria-label="질문 제목"
            onChange={(e) =>
              dispatch({
                type: "SET_QUESTION_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
          />
          <textarea
            className="w-full border-0 outline-none bg-transparent text-[#343741] min-h-[235px] pt-[16px] pb-[8px] resize-none text-[16px] leading-[1.6] placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.question.body}
            placeholder="질문 내용을 자세히 작성해 주세요"
            aria-label="질문 본문"
            onChange={(e) =>
              dispatch({
                type: "SET_QUESTION_FIELD",
                field: "body",
                value: e.target.value,
              })
            }
          />
          <p className="m-0 text-[#9da3b2] text-[14px]">{bodyLength}/2000</p>
        </section>
        <ChipRow
          icon="#"
          title={questionCopy.topicTitle}
          items={SHARED_TOPICS}
        />
      </main>
      <ComposerFooter vehicleLabel={questionCopy.vehicle} />
    </>
  );
}

export default QuestionScreen;
