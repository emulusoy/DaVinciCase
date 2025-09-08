Gereksinimler
- Node.js 18+, npm 9+
- Aç■k portlar: Frontend 5173, Backend 4001 (dev)
- Git (opsiyonel: cURL veya Postman)
Backend (NestJS)
Kurulum ve Çal■■t■rma:
cd Backend
npm i
npm run start:dev
API: http://localhost:4001/api
Swagger: http://localhost:4001/docs


Frontend (React + Vite + TypeScript)
Kurulum ve Çal■■t■rma:
cd frontend
npm i
npm run dev
App: http://localhost:5173
Ortam De■i■keni:
frontend/.env içeri■i:
VITE_API_BASE=http://localhost:4001/api
Lint (ESLint v9 – Flat Config)
Frontend:
npm run lint
npm run lint:fix
Backend:
npm run lint
npm run lint:fix
