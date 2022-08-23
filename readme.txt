網頁開發懶人包 使用說明

・將所需檔案從資料夾複製至新專案資料夾內，然後按照下列步驟安裝需要的檔案。

1. 終端機產生 package.json 檔：npm init -y
2. 安裝 Express：npm install express
3. 安裝 express-handlebars：npm i express-handlebars
4. 設定程式入口為 app.js：開啟 package.json，將 "main": "index.js", 更改為 "main": "app.js",
5. 設定常用腳本：在 package.json 的 "scripts":{} 內新增兩行敘述
   －－"start": "node app.js", "dev": "nodemon app.js",（新增在首行）
6. 設定版本控制：git init
7. 設定gitignore：新增檔案－－.gitignore
8. 瀏覽器開啟git hub，新增 git repository。
   新增完畢後，找到「…or push an existing repository from the command line」
   在終端機依序輸入上一動找到的指令：
   git remote add 主機名稱 URL
   git branch -M main
  （第二行指令執行後，先建立第一筆 commit：在終端機輸入 git add .，然後輸入 git commit -m…）
   git push -u origin main（如果這一動出現錯誤訊息，就先git add . 然後 git commit -m… 然後 git push，接著再輸入此指令）
9. 
