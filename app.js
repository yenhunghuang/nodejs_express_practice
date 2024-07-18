const express = require("express");
const app = express();
const path = require("path");

app.use("/sta", express.static("public"));
//只要知道public路徑檔名可以直接請求資料

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/articles", (req, res) => {
    res.send(
        `<p>Consectetur voluptate sunt do cupidatat voluptate incididunt ex amet incididunt minim veniam dolor. Aliqua reprehenderit adipisicing ad laboris veniam esse voluptate. Dolor ullamco deserunt mollit commodo ad et quis cillum exercitation laboris id mollit. Ut ex esse esse labore pariatur nisi sit aliqua labore quis enim elit est. Labore amet eiusmod pariatur do cupidatat.</p>

<p>Quis et ad velit non consectetur. Nisi veniam dolore enim reprehenderit et elit do aute laboris enim laborum dolor enim est. Consectetur occaecat duis elit cupidatat aliqua anim eiusmod duis minim.</p>

<p>Dolor qui ex minim duis laboris cillum exercitation ullamco culpa cillum non do et ea. Ut ex laboris adipisicing ipsum laborum. Pariatur minim cupidatat et do ea anim quis dolor occaecat..</p>`
    );
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
