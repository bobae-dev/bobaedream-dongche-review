import { useEffect, useRef, useState } from "react";

/**
 * 파일 선택으로 고른 사진·영상과 그 미리보기 URL을 관리하는 훅.
 *
 * 선택한 File 을 그대로 화면에 띄우려면 URL.createObjectURL 로 임시 URL을
 * 만들어야 하는데, 이 URL은 직접 해제하지 않으면 탭을 닫을 때까지 메모리에
 * 남는다. 그래서 항목이 목록에서 빠지는 모든 경로(교체·삭제·언마운트)에서
 * revokeObjectURL 을 부르는 것이 이 훅의 핵심 책임이다.
 *
 * 반환하는 items 는 { id, name, url, type } 배열이다. id 는 같은 파일을 여러 번
 * 올려도 구분되도록 이 훅이 직접 매기며, React key 와 삭제 대상 지정에 쓴다.
 * type 은 File.type (예: "image/png", "video/mp4") 그대로라, 화면에서 사진과
 * 영상을 갈라 그릴 때 쓴다.
 *
 * 여러 개의 <input type="file"> 이 같은 목록에 넣을 수 있다. 질문 화면처럼
 * accept 가 다른 버튼이 둘이어도(사진/영상) add 를 공유하면 한 목록에 쌓인다.
 *
 * @param multiple  true 면 고른 파일을 목록에 계속 추가한다.
 *                  false(기본)면 항상 하나만 유지하고 이전 것을 교체한다.
 * @returns {{ items, add, remove, clear }}
 *   - add    : <input type="file"> 의 onChange 에 그대로 연결한다
 *   - remove : id 로 하나 삭제
 *   - clear  : 전부 삭제
 */
export function useMediaPicker({ multiple = false } = {}) {
  const [items, setItems] = useState([]);
  const nextIdRef = useRef(0);

  // 언마운트 정리에서 "그 시점의" 목록이 필요한데, 정리 함수는 마운트 당시
  // 클로저를 붙들고 있어 photos 를 직접 읽으면 항상 빈 배열이 잡힌다.
  // 그래서 최신 목록을 ref 에 따로 비춰 둔다.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);

  function add(event) {
    const files = [...(event.target.files ?? [])];
    if (files.length === 0) return;

    const picked = files.map((file) => ({
      id: (nextIdRef.current += 1),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setItems((prev) => {
      if (multiple) return [...prev, ...picked];
      prev.forEach((item) => URL.revokeObjectURL(item.url));
      return picked.slice(0, 1);
    });

    // 같은 파일을 연달아 고르면 change 가 안 터지므로 값을 비워 둔다.
    event.target.value = "";
  }

  function remove(id) {
    setItems((prev) => {
      prev
        .filter((item) => item.id === id)
        .forEach((item) => URL.revokeObjectURL(item.url));
      return prev.filter((item) => item.id !== id);
    });
  }

  function clear() {
    setItems((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.url));
      return [];
    });
  }

  return { items, add, remove, clear };
}
