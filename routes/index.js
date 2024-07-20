const express = require("express");
const router = express.Router();

const validateUser = (user) => {
    return true;
};
//建立MiddleWare
const authenticator = (req, res, next) => {
    // 驗證使用者身分
    if (validateUser(req.user)) {
        next();
    } else {
        res.redirect("/");
    }
};

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/about", (req, res) => {
    // throw new Error("This is a test error");
    res.render("about");
});

//跟auth有關的移去./auth裡
router.use("/auth", authenticator, require("./auth"));

//跟article有關的移去./articles裡
router.use("/articles", authenticator, require("./article"));

//跟file有關的
router.use("/file", require("./file"));

router.get("/*", (req, res) => {
    res.send("error!");
});

module.exports = router;
