# EZQuiz 學習平台

EZQuiz 學習平台的官方網站，內容存放在 `content/` 下的 JSON 檔案。

## 🌟 功能特色

- ✨ 響應式設計，支援各種裝置
- 🎨 現代化的 UI/UX 設計
- 🖼️ 動態輪播圖管理
- 👥 團隊成員管理
- 🚀 可直接部署到 GitHub Pages

## 📁 專案結構

```
web/
├── index.html              # 主頁面
├── css/
│   └── style.css          # 樣式表
├── js/
│   └── main.js            # JavaScript 功能
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

直接編輯 JSON 檔案：
- `content/slider.json` - 輪播圖內容
- `content/team.json` - 團隊成員
- `content/settings/site.json` - 網站資訊
- `content/app.json` - App 介紹與下載連結（`downloads.appStore` 填入後，首頁的 App Store 按鈕會自動啟用）

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
