# EZQuiz 學習平台

一個現代化的學習平台網站，整合 Decap CMS 後台管理系統，可以輕鬆管理網站內容。

## 🌟 功能特色

- ✨ 響應式設計，支援各種裝置
- 🎨 現代化的 UI/UX 設計
- 🖼️ 動態輪播圖管理
- 👥 團隊成員管理
- 📝 Decap CMS 後台管理系統
- 🚀 可直接部署到 GitHub Pages

## 📁 專案結構

```
web/
├── index.html              # 主頁面
├── css/
│   └── style.css          # 樣式表
├── js/
│   └── main.js            # JavaScript 功能
├── admin/
│   ├── index.html         # Decap CMS 後台入口
│   └── config.yml         # CMS 配置檔案
├── content/
│   ├── slider.json        # 輪播圖內容
│   ├── team.json          # 團隊成員資料
│   └── settings/
│       └── site.json      # 網站設定
├── images/
│   └── uploads/           # 上傳的圖片儲存位置
└── README.md
```

## 🚀 部署到 GitHub Pages

### 1. 建立 GitHub Repository

```bash
# 初始化 Git repository
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit: EZQuiz 學習平台"

# 連接到 GitHub（替換成你的 repository URL）
git remote add origin https://github.com/你的使用者名稱/你的repository名稱.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2. 啟用 GitHub Pages

1. 進入 GitHub repository 的 **Settings**
2. 點擊左側的 **Pages**
3. 在 **Source** 選擇 `main` 分支
4. 點擊 **Save**
5. 等待幾分鐘後，你的網站會在 `https://你的使用者名稱.github.io/你的repository名稱/` 上線

### 3. 設定 Netlify Identity（用於 Decap CMS 登入）

Decap CMS 需要身份驗證系統，推薦使用 Netlify Identity：

#### 方法 A：使用 Netlify 部署（推薦）

1. 註冊 [Netlify](https://www.netlify.com/) 帳號
2. 點擊 "New site from Git"
3. 連接你的 GitHub repository
4. 部署設定保持預設即可
5. 部署完成後，進入 **Site settings** → **Identity**
6. 點擊 **Enable Identity**
7. 在 **Registration preferences** 選擇 "Invite only"
8. 在 **Services** → **Git Gateway** 點擊 **Enable Git Gateway**
9. 回到你的網站，訪問 `/admin/` 進行註冊和登入

#### 方法 B：GitHub Pages + Netlify Identity

如果你想使用 GitHub Pages 作為主網站，但使用 Netlify Identity 認證：

1. 在 Netlify 建立一個空網站
2. 啟用 Identity 和 Git Gateway（同上）
3. 在 `index.html` 的 `<head>` 中添加：

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

4. 在 `admin/config.yml` 中設定正確的 backend

### 4. 使用 Decap CMS 後台

1. 訪問 `你的網站URL/admin/`
2. 使用 Netlify Identity 登入
3. 現在可以在後台管理：
   - 📸 輪播圖片
   - 👥 團隊成員
   - ⚙️ 網站設定
   - ✨ 平台特色

## 📝 本地開發

### 1. 直接開啟 HTML

直接用瀏覽器開啟 `index.html` 即可預覽網站。

### 2. 使用本地伺服器（推薦）

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需先安裝 http-server)
npx http-server

# 使用 VS Code Live Server 擴充功能
```

然後訪問 `http://localhost:8000`

### 3. 本地測試 Decap CMS

在 `admin/config.yml` 中取消註解：

```yaml
local_backend: true
```

然後執行：

```bash
npx decap-server
```

## 🎨 自訂網站

### 修改顏色主題

編輯 `css/style.css` 中的 CSS 變數：

```css
:root {
    --primary-color: #4A90E2;      /* 主要顏色 */
    --secondary-color: #50E3C2;    /* 次要顏色 */
    --dark-color: #2C3E50;         /* 深色 */
    --light-color: #F8F9FA;        /* 淺色 */
}
```

### 修改內容

#### 使用 Decap CMS 後台（推薦）
訪問 `/admin/` 使用圖形化界面編輯內容

#### 直接編輯 JSON 檔案
- `content/slider.json` - 輪播圖內容
- `content/team.json` - 團隊成員
- `content/settings/site.json` - 網站資訊

## 🔧 進階設定

### 添加 Google Analytics

在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=你的GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '你的GA-ID');
</script>
```

### 添加自訂網域

1. 在 GitHub repository 的 Settings → Pages
2. 在 Custom domain 輸入你的網域
3. 在你的網域 DNS 設定添加 CNAME 記錄指向 `你的使用者名稱.github.io`

## 📱 支援的瀏覽器

- Chrome (推薦)
- Firefox
- Safari
- Edge
- Opera

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

## 📄 授權

MIT License

## 📞 聯絡資訊

- Email: contact@ezquiz.com
- Website: https://你的網站.com

---

**製作日期：** 2025年11月8日  
**版本：** 1.0.0
