const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const fs = require("fs");

//設定樣版引擎
// Set up Handlebars engine with custom helpers
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//logger 放在最前面
const logger = (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${
        req.originalUrl
    }\n`;

    // Write to the log file (append using 'a' flag)
    fs.writeFile(
        path.join(__dirname, "./log/log.txt"),
        logEntry,
        { flag: "a+" },
        (err) => {
            if (err) console.log(err);
            next();
        }
    );
};

const errorHandler = (err, req, res, next) => {
    console.log("Error:", err);
    console.log(err.name + ": " + err.message);

    if (err)
        res.status(500).send(`<h1>there is an error:  ${err.message}</h1>`);
};

// logger middleware
app.use(logger);

app.use("/static", express.static("public"));
//只要知道public路徑檔名可以直接請求資料
app.use("/", require("./routes/index"));

// After all other middleware/route handlers
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Express listens on port 3000");
});
