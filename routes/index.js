const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/about", (req, res) => {
    res.render("about");
});

//跟auth有關的移去./auth裡
router.use("/auth", require("./auth"));

//跟article有關的移去./articles裡
router.use("/articles", require("./article"));

//跟file有關的
router.use("/file", require("./file"));

router.get("/*", (req, res) => {
    res.send("error!");
});

module.exports = router;
