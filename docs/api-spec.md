# API 規格文件

> Base URL：`/api`  
> 回應格式：統一 JSON（success / message / data / error）  
> 身分識別：訪客模式，購物車/結帳/遊戲庫相關 API 需帶 `X-Guest-Id` header。

---

## 1. 統一回應格式

### 1.1 成功回應（Success）
```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

### 1.2 失敗回應（Error）
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

---

## 2. Header 規格（訪客識別）

### 2.1 必要 Header
以下端點需要 Header：

- `/api/cart/*`
- `/api/checkout`
- `/api/library`

Header：
- `X-Guest-Id: <guestId>`

錯誤情況（缺少 Header）：
- Status：`400`
- 範例回應：
```json
{
  "success": false,
  "message": "Missing X-Guest-Id header",
  "error": {
    "code": "MISSING_GUEST_ID",
    "details": []
  }
}
```

---

## 3. 健康檢查

### GET /api/health
- 說明：確認後端服務是否啟動
- Header：無
- Query：無

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "OK",
  "data": { "status": "up" }
}
```

---

## 4. Games（遊戲資料）

> 遊戲資料由後端 `seed` 預載（訪客不能新增/修改/刪除）。

### 4.1 取得遊戲清單
#### GET /api/games
- 說明：取得商店用遊戲清單（預設只回傳上架 `isActive=true`）
- Header：無
- Query：無（目前版本）

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "games": [
      {
        "_id": "65f0...abcd",
        "title": "Gears 5",
        "shortDescription": "....",
        "description": "....",
        "heroImage": "https://...",
        "capsuleImage": "https://...",
        "coverImage": "https://...",
        "screenshots": ["https://...", "https://..."],
        "releaseDate": "2019 年 9 月 10 日",
        "developer": "The Coalition",
        "publisher": "Xbox Game Studios",
        "tags": ["動作", "冒險"],
        "editions": [
          { "id": "standard", "name": "Standard Edition", "price": 788, "note": "本體遊戲" },
          { "id": "deluxe", "name": "Deluxe Edition", "price": 988, "note": "含額外造型" }
        ],
        "isActive": true,
        "createdAt": "2026-01-11T00:00:00.000Z",
        "updatedAt": "2026-01-11T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 4.2 取得遊戲詳細
#### GET /api/games/:id
- 說明：取得單一遊戲詳細資料（詳細頁使用）
- Header：無
- Path Params：
  - `id`：遊戲 `_id`

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "game": {
      "_id": "65f0...abcd",
      "title": "Gears 5",
      "screenshots": ["https://...", "https://..."],
      "editions": [
        { "id": "standard", "name": "Standard Edition", "price": 788, "note": "本體遊戲" }
      ]
    }
  }
}
```

錯誤回應：
- 找不到遊戲：Status `404`
```json
{
  "success": false,
  "message": "Game not found",
  "error": { "code": "GAME_NOT_FOUND", "details": [] }
}
```

- id 格式錯誤：Status `400`
```json
{
  "success": false,
  "message": "Invalid game id",
  "error": { "code": "INVALID_ID", "details": [] }
}
```

---

## 5. Cart（購物車）

> 購物車以 `guestId` 綁定，一個訪客一個 cart。

### 5.1 取得購物車
#### GET /api/cart
- Header：
  - `X-Guest-Id`（必填）

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "cart": {
      "items": [
        {
          "itemId": "65f1...9999",
          "gameId": "65f0...abcd",
          "editionId": "standard",
          "titleSnapshot": "Gears 5",
          "editionSnapshot": "Standard Edition",
          "priceSnapshot": 788,
          "coverSnapshot": "https://...",
          "addedAt": "2026-01-11T00:10:00.000Z"
        }
      ]
    }
  }
}
```

---

### 5.2 加入購物車（由詳細頁選版本）
#### POST /api/cart/items
- Header：
  - `X-Guest-Id`（必填）
- Body（JSON）：
```json
{
  "gameId": "<Game._id>",
  "editionId": "standard"
}
```

成功回應：
- Status：`201`
```json
{
  "success": true,
  "message": "Added",
  "data": {
    "cart": {
      "items": [
        {
          "itemId": "65f1...9999",
          "gameId": "65f0...abcd",
          "editionId": "standard",
          "titleSnapshot": "Gears 5",
          "editionSnapshot": "Standard Edition",
          "priceSnapshot": 788,
          "coverSnapshot": "https://...",
          "addedAt": "2026-01-11T00:10:00.000Z"
        }
      ]
    }
  }
}
```

錯誤回應：
- Body 缺欄位：Status `400`
```json
{
  "success": false,
  "message": "gameId and editionId are required",
  "error": { "code": "VALIDATION_ERROR", "details": [] }
}
```

- 找不到遊戲：Status `404`
```json
{
  "success": false,
  "message": "Game not found",
  "error": { "code": "GAME_NOT_FOUND", "details": [] }
}
```

- 找不到版本：Status `404`
```json
{
  "success": false,
  "message": "Edition not found",
  "error": { "code": "EDITION_NOT_FOUND", "details": [] }
}
```

---

### 5.3 移除購物車項目
#### DELETE /api/cart/items/:itemId
- Header：
  - `X-Guest-Id`（必填）
- Path Params：
  - `itemId`：購物車項目 id（來自 `GET /api/cart` 的 `itemId`）

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "Removed",
  "data": {
    "cart": { "items": [] }
  }
}
```

錯誤回應：
- 找不到購物車：Status `404`
```json
{
  "success": false,
  "message": "Cart not found",
  "error": { "code": "CART_NOT_FOUND", "details": [] }
}
```

- 找不到項目：Status `404`
```json
{
  "success": false,
  "message": "Cart item not found",
  "error": { "code": "CART_ITEM_NOT_FOUND", "details": [] }
}
```

---

### 5.4 清空購物車
#### DELETE /api/cart
- Header：
  - `X-Guest-Id`（必填）

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "Cleared",
  "data": {
    "cart": { "items": [] }
  }
}
```

---

## 6. Checkout（結帳）

### POST /api/checkout
- 說明：結帳流程（建立訂單、加入遊戲庫、清空購物車）
- Header：
  - `X-Guest-Id`（必填）
- Body：無

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "Checkout success",
  "data": {
    "orderId": "65f2...eeee",
    "totalPrice": 1786,
    "purchasedCount": 2
  }
}
```

錯誤回應：
- 購物車空：Status `400`
```json
{
  "success": false,
  "message": "Cart is empty",
  "error": { "code": "CART_EMPTY", "details": [] }
}
```

---

## 7. Library（我的遊戲庫）

### GET /api/library
- 說明：取得訪客已購買遊戲與版本列表
- Header：
  - `X-Guest-Id`（必填）

成功回應：
- Status：`200`
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "library": {
      "games": [
        {
          "gameId": "65f0...abcd",
          "editionId": "ultimate",
          "titleSnapshot": "Gears 5",
          "editionSnapshot": "Ultimate Edition",
          "priceSnapshot": 1288,
          "coverSnapshot": "https://...",
          "purchasedAt": "2026-01-11T00:20:00.000Z"
        }
      ]
    }
  }
}
```

---

## 8. HTTP Status Code 規範

- `200 OK`：成功讀取/刪除/結帳成功
- `201 Created`：新增購物車項目成功
- `400 Bad Request`：缺少參數、id 格式錯誤、缺少 `X-Guest-Id`、購物車空等
- `404 Not Found`：找不到遊戲 / 版本 / 購物車 / 購物車項目
- `500 Internal Server Error`：伺服器未預期錯誤

---

## 9. 測試建議（Postman）

### Environment 變數
- `baseUrl`：`http://localhost:5000/api`
- `guestId`：`guest_test_001`

### Header（Cart / Checkout / Library 必帶）
- `X-Guest-Id: {{guestId}}`

### 建議測試流程
1. `GET {{baseUrl}}/games`
2. `GET {{baseUrl}}/games/:id`
3. `GET {{baseUrl}}/cart`（帶 Header）
4. `POST {{baseUrl}}/cart/items`（帶 Header）
   ```json
   { "gameId": "<gameId>", "editionId": "standard" }
   ```
5. `POST {{baseUrl}}/checkout`（帶 Header）
6. `GET {{baseUrl}}/library`（帶 Header）
