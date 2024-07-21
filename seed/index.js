const path = require("path");
const fs = require("fs");

const articles = require("./article");

const articlesJsonPath = path.join(__dirname, "../data/articles/articles.json");

//先讀取檔案再寫入檔案
fs.readFile(articlesJsonPath, (err, data) => {
    if (err) console.log(err);

    const newData = JSON.stringify(articles, null, 4);

    fs.writeFile(articlesJsonPath, newData, (err) => {
        if (err) console.log(err);
    });
});
