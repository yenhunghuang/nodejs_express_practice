const express = require("express");
const router = express.Router();
// const articles = require("../data/");
const path = require("path");
const fs = require("fs");

const articleFilePath = path.join(
    __dirname,
    "../../data/articles/articles.json"
);

//文章列表
router.get("/", (req, res) => {
    fs.readFile(articleFilePath, (err, data) => {
        if (err) console.log(err);
        const articles = JSON.parse(data);
        //readFile is asyncro function, put redner just after read completed
        res.render("articles", {
            articles: articles,
            basePath: "/api",
        });
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
            backUrl: "/api/articles", // 回上一頁
            editUrl: `/api/articles/${id}/edit`, //編輯文章頁面
            deleteMethod: "delete", //刪除文章的method
            deleteUrl: `/api/articles/${id}`, //刪除文章的URI
            js: ["article.js"], //載入js file
        });
    });
});

//新文章
router.post("/", (req, res) => {
    const { title, subtitle, content } = req.body;

    if (!title)
        return res.status(404).json({
            statusText: "fail",
            message: "Fail to post article, title is required",
        });

    fs.readFile(articleFilePath, (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({
                status: "error",
                message: "Error reading articles data.",
            });
        }

        const articles = JSON.parse(data.toString());

        articles.push({
            id: articles.length,
            title: title || "",
            subtitle: subtitle || "",
            createDate: new Date().toString(),
            content: content || "",
            publish: true,
            url: `/articles/${articles.length}`,
        });

        newData = JSON.stringify(articles, null, 4);
        fs.writeFile(articleFilePath, newData, (err) => {
            if (err) {
                console.error("Error saving the file:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Error saving new article data.",
                });
            }
            // Respond back with success
            res.status(201).json({
                status: "success",
                message: "Article posted successfully.",
            });
        });
    });
});

//修改文章
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const { title, subtitle, content } = req.body;

    fs.readFile(articleFilePath, (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({
                status: "error",
                message: "Error reading articles data.",
            });
        }

        const articles = JSON.parse(data.toString());

        // Update the article
        articles[id] = {
            ...articles[id],
            title: title || "",
            subtitle: subtitle || "",
            updateDate: new Date().toString(), //修改日期
            content: content || "",
        };

        newData = JSON.stringify(articles, null, 4);
        fs.writeFile(articleFilePath, newData, (err) => {
            if (err) {
                console.error("Error saving the file:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Error saving new article data.",
                });
            }
            // Respond back with success
            res.status(201).json({
                status: "success",
                message: "Article posted successfully.",
            });
        });
    });
});

//刪除文章
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id); // Convert the id to an integer, assuming ids are numeric

    fs.readFile(articleFilePath, (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({
                status: "error",
                message: "Error reading articles data.",
            });
        }

        let articles = JSON.parse(data);
        // Find the article by id
        const articleIndex = articles.findIndex((article) => article.id === id);

        if (articleIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Article not found.",
            });
        }

        // Update the article for soft deletion
        Object.assign(articles[articleIndex], {
            publish: false,
            deleted: true,
            deleteDate: new Date().toString(),
        });

        const newData = JSON.stringify(articles, null, 4);
        fs.writeFile(articleFilePath, newData, (err) => {
            if (err) {
                console.error("Error deleting to the file:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Error deleting article data.",
                });
            }
            // Respond back with success
            res.status(200).json({
                status: "success",
                message: "Article successfully deleted (soft delete).",
                article: articles[articleIndex], // Send back the updated article data
            });
        });
    });
});

module.exports = router;
