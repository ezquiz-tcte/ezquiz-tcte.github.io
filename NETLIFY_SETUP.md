# Netlify + Decap CMS 設定指南

## 🔧 問題修復

已修復以下問題：
- ✅ 將 config.yml 的分支從 `main` 改為 `master`
- ✅ 在 index.html 添加 Netlify Identity Widget script
- ✅ 添加自動登入重定向腳本

## 📋 完整設定步驟

### 1️⃣ 在 Netlify 部署網站

1. 前往 [Netlify](https://app.netlify.com/)
2. 點擊 **"Add new site"** → **"Import an existing project"**
3. 選擇 **"Deploy with GitHub"**
4. 授權 Netlify 訪問你的 GitHub
5. 選擇 `ezquiz-tcte/ezquiz-tcte.github.io` repository
6. 設定如下：
   - **Branch to deploy**: `master`
   - **Build command**: 留空（這是靜態網站）
   - **Publish directory**: `/`（根目錄）
7. 點擊 **"Deploy site"**

### 2️⃣ 啟用 Netlify Identity

1. 部署完成後，進入你的網站 dashboard
2. 點擊頂部的 **"Site configuration"**
3. 在左側選單找到 **"Identity"**
4. 點擊 **"Enable Identity"**

### 3️⃣ 設定 Registration Preferences

在 Identity 頁面：
1. 找到 **"Registration preferences"** 區域
2. 選擇 **"Invite only"**（只允許邀請註冊）
3. 儲存設定

### 4️⃣ 啟用 Git Gateway

1. 在 Identity 頁面
2. 找到 **"Services"** 區域
3. 點擊 **"Enable Git Gateway"**
4. 確認啟用

### 5️⃣ 邀請使用者（你自己）

1. 在 Identity 頁面
2. 點擊 **"Invite users"** 按鈕
3. 輸入你的 Email
4. 點擊 **"Send"**

### 6️⃣ 設定密碼

1. 檢查你的 Email 信箱
2. 點擊邀請郵件中的連結
3. 設定你的密碼

### 7️⃣ 訪問後台

1. 前往你的 Netlify 網站 URL，例如：`https://你的網站名稱.netlify.app/admin/`
2. 使用你的 Email 和密碼登入
3. 現在可以開始編輯內容了！

## 🎯 測試登入

訪問：
- Netlify 網站：`https://你的網站名稱.netlify.app/admin/`
- 或 GitHub Pages：`https://ezquiz-tcte.github.io/admin/`

## ⚠️ 常見問題解決

### 問題 1: "Unable to access identity settings"

**原因**：
- Git Gateway 未啟用
- 分支名稱不正確
- Netlify Identity 未啟用

**解決方法**：
1. 確認 `admin/config.yml` 中的 `branch: master` 正確
2. 確認 Netlify Identity 已啟用
3. 確認 Git Gateway 已啟用
4. 重新部署網站

### 問題 2: 登入後無法編輯

**原因**：
- Git Gateway 權限問題
- GitHub repository 權限不足

**解決方法**：
1. 在 Netlify 檢查 Git Gateway 狀態
2. 確認 GitHub repository 是你自己的，不是 fork
3. 重新啟用 Git Gateway

### 問題 3: 無法上傳圖片

**原因**：
- Media folder 路徑錯誤
- 權限不足

**解決方法**：
1. 確認 `images/uploads/` 資料夾存在
2. 確認 Git Gateway 有寫入權限

## 🔄 推送更新

修改完成後，推送到 GitHub：

```bash
cd C:\Users\Administrator\Desktop\web\ezquiz-tcte.github.io

git add .
git commit -m "修復 Netlify Identity 設定"
git push origin master
```

## 📱 同時使用 GitHub Pages 和 Netlify

**兩者的區別**：
- **GitHub Pages**：`https://ezquiz-tcte.github.io/`
  - 免費的靜態網站託管
  - 直接顯示網站內容
  - 無法使用 Decap CMS 後台

- **Netlify**：`https://你的網站名稱.netlify.app/`
  - 可以使用 Decap CMS 後台
  - 提供 Identity 服務
  - 可以編輯內容

**建議作法**：
1. 使用 Netlify 部署並管理內容
2. GitHub Pages 作為備用或鏡像網站
3. 所有內容編輯都在 Netlify 的 `/admin/` 完成

## ✅ 驗證清單

確認以下項目都已完成：

- [ ] Netlify 網站已部署
- [ ] Netlify Identity 已啟用
- [ ] Git Gateway 已啟用
- [ ] Registration 設為 "Invite only"
- [ ] 已邀請自己並設定密碼
- [ ] `config.yml` 分支設為 `master`
- [ ] `index.html` 包含 Netlify Identity Widget script
- [ ] 可以成功登入 `/admin/` 後台
- [ ] 可以在後台看到所有內容集合
- [ ] 測試編輯一個項目並儲存

## 🎉 完成後

現在你可以：
1. 訪問 `你的netlify網址/admin/` 管理內容
2. 編輯輪播圖、團隊成員、網站設定
3. 上傳新的圖片
4. 所有變更會自動提交到 GitHub
5. GitHub Pages 會自動更新

## 📞 需要幫助？

如果仍然遇到問題：
1. 檢查 Netlify 的 Deploy log
2. 檢查瀏覽器 Console (F12) 的錯誤訊息
3. 確認 GitHub repository 的權限設定
