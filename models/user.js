const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  //GOOGLE AUTH
  provider: {
    type: String,
  },
  providerId: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  image: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dwqeco7oo/image/upload/v1712837630/Wanderlust/fkmgjqy744wljuo8zh1m.jpg",
    },
    filename: String,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
