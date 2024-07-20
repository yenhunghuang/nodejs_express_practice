const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
// const articles = require("./data/articles");

//設定樣版引擎
// Set up Handlebars engine with custom helpers
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use("/static", express.static("public"));
//只要知道public路徑檔名可以直接請求資料

app.use("/", require("./routes/index"));

app.listen(3000, () => {
    console.log("Express listens on port 3000");
});
