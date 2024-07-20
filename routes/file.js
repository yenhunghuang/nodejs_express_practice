const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/txt", (req, res) => {
    const absPath = path.join(__dirname, "../file/test.txt");
    res.sendFile(absPath, (err) => {
        console.log("Serving file from:", absPath);
    });
});

router.get("/html", (req, res) => {
    const absPath = path.join(__dirname, "../file/html/test.html");
    res.sendFile(absPath, (err) => {
        console.log("Serving file from:", absPath);
    });
});

router.get("/image", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/image/img1.jpg"));
});

module.exports = router;
