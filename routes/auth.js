const express = require("express");
const router = express.Router();
const passport = require("../auth/google");
const User = require("../models/user");
const { func } = require("joi");

//Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }), (req, res)=>{
	req.flash("success", `Welcome ${req.user.name} to WanderLust!`);
	res.redirect("/listings");
  }
);

module.exports = router;
