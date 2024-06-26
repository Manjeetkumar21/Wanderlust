if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const mehtodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const wrapAsync = require("./utils/wrapAsync");
const listingRoute = require("./routes/listing");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")
const Listing = require("./models/listing");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(mehtodOverride("_method"));
app.engine("ejs", ejsMate);


const dbURL = process.env.ATLAS_DB;

async function main() {
  await mongoose.connect(dbURL);
}

main()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Some ERROR occured during Connection", err);
  });


const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", ()=>{
  console.log("Error Occured in MongoStore ", err);
})

const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/", wrapAsync(async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
}))
;

app.use("/auth", authRoute);
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  res.status(statusCode).render("error.ejs", { message });
});

//Listen PORT
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
