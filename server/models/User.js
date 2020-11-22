const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    match: /^[a-zA-Z\s\-]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  password: {
    required: true,
    type: String,
  },
  absen: {
    type: Number,
    required: false,
  },
  kelas: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    default: "siswa",
    enum: ["siswa", "guru", "admin"],
  },
  date: {
    required: false,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
