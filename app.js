const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const articles = require("./data/articles");

//設定樣版引擎
// Set up Handlebars engine with custom helpers
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("home");
});

//單篇文章
app.get("/articles/:id", (req, res) => {
    const id = req.params.id;
    // console.log(articles[id]);
    // Log the article data
    res.render("article", {
        // Assuming 'article.handlebars' is your template
        article: articles[id],
        backUrl: "/articles",
    });
});

//文章列表
app.get("/articles", (req, res) => {
    res.render("articles", { articles: articles });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.use("/static", express.static("public"));
//只要知道public路徑檔名可以直接請求資料

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/txt", (req, res) => {
    const absPath = path.join(__dirname, "/file/test.txt");
    res.sendFile(absPath, (err) => {
        console.log(err);
    });
});

app.get("/html", (req, res) => {
    const absPath = path.join(__dirname, "/file/html/test.html");
    res.sendFile(absPath, (err) => {
        console.log(err);
    });
});

app.get("/image", (req, res) => {
    res.sendFile(path.join(__dirname, "public/image/img1.jpg"));
});

app.get("/*", (req, res) => {
    res.send("error!");
});
app.listen(3000, () => {
    console.log("Express listens on port 3000");
});
