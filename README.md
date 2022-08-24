# 我的口袋餐廳
## 簡介
這是一個後端學習者的簡易專案，模擬餐廳搜尋網站
## 功能
・使用者可註冊帳號

・使用者可在首頁瀏覽餐廳資料

・使用者可用關鍵詞搜尋特定餐廳

・使用者可點擊餐廳卡片觀看詳細資料

・使用者建立的餐廳資料只有自己能存取

・使用者可讀取、新增、修改、刪除餐廳資料

・使用者可選擇資料排序規則

## 安裝 
1. 使用終端機 Clone 此專案至本機電腦
```
git clone https://github.com/PigeonShogi/Restaurant-List.git
```

2. 使用終端機進入存放此專案的資料夾
```
cd restaurant_file
```

3. 安裝 nodemon
```
npm install -g nodemon
```

4. 建立 package.json 檔
```
npm init -y
```

5. 利用 npm 安裝所需套件
```
npm i express@4.16.4
npm i express-handlebars@3.0.0
```

6. 以 nodemon 開啟 app.js
```
nodemon app.js
```

7. 複製顯示在終端機的網址，前往網頁

## 開發工具
* Node.js 14.16.0
* Express 4.18.1
* Express-Handlebars 6.0.6
* express-session: 1.17.1
* Bootstrap 5.2.0
* bcryptjs 2.4.3
* connect-flash 0.1.1
* dotenv 16.0.1
* Font-awesome 6.1.1
* method-override 3.0.0
* mongoose 6.5.2
* passport 0.4.1
* passport-facebook 3.0.0
* passport-local 1.0.0