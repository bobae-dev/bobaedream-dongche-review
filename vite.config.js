import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// GitHub Pages 프로젝트 사이트는 https://<사용자>.github.io/<저장소>/ 아래에서
// 서비스되므로, 빌드 결과의 asset 경로 앞에 저장소 이름이 붙어야 한다.
// 이게 없으면 /assets/... 로 나가서 전부 404가 난다.
// dev 서버까지 하위 경로로 밀리면 불편하므로 빌드할 때만 적용한다.
const REPO_BASE = "/bobaedream-dongche-review/";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? REPO_BASE : "/",
  plugins: [react(), tailwindcss()],
}));
