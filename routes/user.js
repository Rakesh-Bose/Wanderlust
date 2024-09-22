const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
let passport = require("passport");
const { saveRedirectUrl } = require("../middileware.js");
const controlleruser=require("../controllers/users.js")
router.get("/signup",controlleruser.getsignup )
router.post("/signup", wrapasync(controlleruser.postsignup))
router.get("/login",controlleruser.getlogin )
router.post("/login", saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),controlleruser.postlogin
    )
router.get("/logout", controlleruser.logout)
module.exports = router;