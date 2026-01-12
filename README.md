# Mini Steam（訪客版遊戲商店）

以 **React + Express + MongoDB** 打造的迷你 Steam 風格遊戲商店，前後端分離。支援訪客瀏覽遊戲、進入遊戲詳細頁（截圖輪播）、選擇版本（Standard / Deluxe / Ultimate）加入購物車、結帳並加入「我的遊戲庫」，介面支援深/淺色主題切換。

---

## 系統架構

- 前端：React (Vite) SPA，呼叫後端 REST API，提供首頁精選輪播、詳細頁截圖輪播、購物車、遊戲庫。
- 後端：Express 提供 Games / Cart / Checkout / Library API，統一回應格式與錯誤處理。
- 資料庫：MongoDB（使用 Docker 啟動），內含 seed 腳本預載 8 款遊戲資料（非使用者新增）。

---

## 技術堆疊

- frontend：React, Vite, Bootstrap, ESLint
- backend：Node.js, Express, Mongoose, dotenv, cors, nodemon
- infra：MongoDB 7, Docker / Docker Compose

---

## 環境需求

- Node.js 18+、npm
- Docker Desktop + Docker Compose（用來啟動 MongoDB）

---

## 專案結構

```bash
114_web_final_project/
├── backend/
│   ├── docker-compose.yml
│   ├── controllers/
│   │   ├── gamesController.js
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── libraryController.js
│   ├── middleware/
│   │   ├── requireGuest.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Game.js
│   │   ├── Cart.js
│   │   ├── Library.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── gamesRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   └── libraryRoutes.js
│   ├── seed/
│   │   └── seed.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── .env
├── docs/
└── README.md

```

## 環境變數

後端 `backend/.env`

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_steam
CORS_ORIGIN=http://localhost:5173
```

前端 `frontend/.env`

```bash
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:5000/api
```

## 快速開始

1. 啟動 Mongo（使用 docker-compose）

```bash
cd backend
docker compose up -d
```

2. 啟動seed

```bash
cd backend
npm run seed
```

3. 啟動後端

```bash
cd backend
npm install
npm run dev
```

4. 啟動前端

```bash
cd frontend
npm install
npm run dev
```

## API 文件

完整端點說明請見`docs/api-spec.md`

## 功能特色概要

### 一、遊戲商店（首頁）
- 預設顯示 8 款遊戲（由 seed 預載，非使用者新增）
- Steam 風格精選輪播：每頁 4 格（左大 / 中大 / 右上 / 右下）
- 點擊遊戲可進入詳細頁（才能加入購物車）

### 二、遊戲詳細頁
- 左側主圖 + 截圖縮圖列（截圖輪播）
- 右側顯示：
  - capsule 圖
  - 簡介（shortDescription / description）
  - 發行日期、開發商、發行商
  - 熱門標籤
  - 版本選擇（Standard / Deluxe / Ultimate…）
- 只能在詳細頁「加入購物車」

### 三、購物車（Cart）
- 顯示加入的遊戲與版本
- 移除單一項目 / 清空購物車
- 顯示總金額

### 四、結帳與遊戲庫（Checkout / Library）
- 結帳後：
  - 建立訂單（Order）
  - 加入遊戲庫（Library）
  - 清空購物車
- 遊戲庫顯示已擁有遊戲與版本、購買時間

### 五、訪客識別（Guest）
- 使用 `X-Guest-Id` 追蹤訪客資料（購物車 / 遊戲庫 / 訂單）
- 前端會將 `guestId` 存在 localStorage（或可由 Postman 自訂）
