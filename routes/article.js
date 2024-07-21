const express = require("express");
const router = express.Router();
// const articles = require("../data/");
const path = require("path");
const fs = require("fs");

const articleFilePath = path.join(__dirname, "../data/articles/articles.json");

//文章列表
router.get("/", (req, res) => {
    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);
        const articles = JSON.parse(data);
        //readFile is asyncro function, put redner just after read completed
        res.render("articles", { articles: articles });
    });
});

//單篇文章
router.get("/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);
        const articles = JSON.parse(data.toString());

        res.render("article", {
            article: articles[id],
            backUrl: "/articles", // 回上一頁
            editUrl: `/articles/${id}/edit`, //編輯文章頁面
            deleteMethod: "delete", //刪除文章的method
            deleteUrl: `api/articles/${id}`, //刪除文章的URI
            js: ["article.js"], //載入js file
        });
    });
});

module.exports = router;
