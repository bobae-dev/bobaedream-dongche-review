# 보배드림 동체 리뷰 작성 UI

차량 리뷰 작성 화면을 React로 구현한 프로토타입입니다. 디자인 재현이 목적이라
서버 연동 없이 화면과 입력 흐름만 동작합니다.

**배포**: https://bobae-dev.github.io/bobaedream-dongche-review/

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist)
npm run lint     # ESLint
```

## 화면

상단 탭으로 전환되는 8개 화면이 있습니다. 라우터 없이 `state.screen` 분기로
처리하므로 새로고침하면 첫 화면으로 돌아갑니다.

| 화면 | 주요 동작 |
| --- | --- |
| 차량 점수 | 0.5점 단위 별점(별 → 팝업에서 확정), 대표 사진 업로드 |
| 소식 | 제목·본문, 사진 여러 장 업로드 |
| 질문 | 제목·본문, 사진·영상 업로드 |
| 긴 글 / 판매글 / 차주가 / 에너지 | 폼 입력 |
| 차량·지역 선택 | 목록에서 선택 |

## 구조

```
src/
  App.jsx          화면 라우팅과 상태 소유
  data/            문구·목록 등 순수 상수
  state/           리듀서, 초기 상태, 파생값 계산
  hooks/           useMediaPicker(파일 첨부), useDragScroll(가로 스크롤)
  components/      여러 화면이 공유하는 UI
  screens/         화면별 컴포넌트
```

`sork20/`는 이 프로젝트가 재현 대상으로 삼은 바닐라 JS 원본입니다. 빌드에
포함되지 않으며 디자인 대조용으로만 둡니다.

## 배포

`main`에 푸시하면 [deploy.yml](.github/workflows/deploy.yml)이 빌드 후 GitHub
Pages에 올립니다. Pages 프로젝트 사이트는 `/<저장소이름>/` 하위에서 서비스되므로
[vite.config.js](vite.config.js)에서 빌드 시 `base`를 그 경로로 지정합니다.
