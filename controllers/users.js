const User = require("../models/user");
const Listing = require("../models/listing");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let {name, username, email, password } = req.body;
    const newUser = new User({name, email, username });
    let registeredUser = await User.register(newUser, password);
   
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome ${name} to WanderLust!`);
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  let {username} = req.body;
  req.flash("success", `Welcome back ${username} to WanderLust!`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now!");
    res.redirect("/listings");
  });
};

module.exports.profile = async (req, res, next) => {
  let currUser = req.user;
  let allListings = await Listing.find({owner: currUser._id}).sort({_id: -1});
  let userProfile = await User.findById(currUser._id);
  console.log(userProfile)
  res.render("users/profile.ejs", {allListings, userProfile});

};

module.exports.renderProfileEditForm = (req, res, next)=>{
  res.render("users/edit.ejs")
}

module.exports.updateProfile = async (req, res, next)=>{
  let id = req.user._id;
  let {name, username, email} = req.body;
  console.log({name, username, email})
  let updatedProfile = await User.findByIdAndUpdate(id, {
    name: name,
    username: username,
    email: email,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedProfile.image = { url, filename };
    updatedProfile.save();
  }

  req.flash("success", "Profile Update Route Working!");
  res.redirect("/profile")
}
