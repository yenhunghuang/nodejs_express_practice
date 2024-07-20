const express = require("express");
const router = express.Router();
const articles = require("../data/articles");

//單篇文章
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(articles[id]);
    // Log the article data
    res.render("article", {
        // Assuming 'article.handlebars' is your template
        article: articles[id],
        backUrl: "/articles",
    });
});

//文章列表
router.get("/", (req, res) => {
    res.render("articles", { articles: articles });
});

module.exports = router;
