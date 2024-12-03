const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Path `userName` is required."],
  },
  email: {
    type: String,
    required: [true, "Path `email` is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Path `password` is required."],
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER", "MODERATOR"],
    default: "USER",
    set: (val) => val.toUpperCase(), 
  },
});

module.exports = mongoose.model("User", UserSchema);
