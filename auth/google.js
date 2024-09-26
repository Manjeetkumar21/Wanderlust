const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
  new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done)=> {
      let googleUser;
      try {
        let currUser = profile._json;
        let existingUser = await User.findOne({ providerId: currUser.sub });
        if (existingUser) {
          return done(null, existingUser);
        }

        let username = currUser.given_name.toLowerCase();

        // Check if the username already exists
        let userWithSameUsername = await User.findOne({ username });
        if (userWithSameUsername) {
          // If the username already exists, create a unique username
          username = `${username}${Math.floor(Math.random() * 10000)}`;
        }

        const newUser = new User({
          provider: "google",
          providerId: currUser.sub,
          name: currUser.name,
          username: username,
          email: currUser.email,
        });

        googleUser = await newUser.save();
        console.log(googleUser);

      } catch (err) {
       console.log("Some error occured during authentication")
      }

      return done(null, googleUser);
    }
  )
);

module.exports = passport;
