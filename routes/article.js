const express = require("express");
const router = express.Router();
// const articles = require("../data/articles");
const path = require("path");
const fs = require("fs");

// articles.json file path
const articleFilePath = path.join(__dirname, "../data/articles/articles.json");

// 文章列表
router.get("/", (req, res) => {
    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);

        const articles = JSON.parse(data.toString());

        // 使用樣板
        res.render("articles", {
            articles: articles,
        });
    });
});

// 進入新增文章頁面, 此路由必須在 router.get("/:id") 之前
router.get("/new", (req, res) => {
    res.render("articleEdit", {
        article: {
            title: "",
            subTitle: "",
            content: "",
        },
        saveMethod: "post", // 新增文章的 method
        saveUrl: "/api/articles", // 新增文章的 URI
        cancelUrl: "/articles", // 取消編輯的轉址
        js: ["article.js"], // 載入 js file
    });
});

// 取得單篇文章
router.get("/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);

        const articles = JSON.parse(data.toString());
        // 使用樣板
        res.render("article", {
            article: articles[id],
            backUrl: "/articles", // 回到上一頁
            editUrl: `/articles/${id}/edit`, // 編輯文章頁面
            deleteMethod: "delete", // 刪除文章的 method
            deleteUrl: `/api/articles/${id}`, // 刪除文章的 URI
            js: ["article.js"], // 載入 js file
        });
    });
});

// 進入編輯文章頁面
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;

    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);

        const articles = JSON.parse(data.toString());

        // 使用視圖模板
        res.render("articleEdit", {
            id: id,
            article: articles[id],
            saveMethod: "put", // 修改文章的 method
            saveUrl: `/api/articles/${id}`, // 修改文章的 URI
            cancelUrl: `/articles/${id}`, // 取消編輯的轉址
            backUrl: "/articles",
            js: ["article.js"], // 載入 js file
        });
    });
});

module.exports = router;
