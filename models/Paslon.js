const mongoose = require("mongoose");

const PaslonScheme = mongoose.Schema({
  ketua: {
    required: true,
    match: /^[a-zA-Z\s\-]+$/,
    type: String,
  },
  wakil: {
    required: true,
    match: /^[a-zA-Z\s\-]+$/,
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  memilih: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    required: false,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("paslon", PaslonScheme);
