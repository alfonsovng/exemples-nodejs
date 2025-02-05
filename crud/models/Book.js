const mongoose = require('mongoose');

//schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  genre: String,
  published_year: Number,
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
});

//create model and export
module.exports = mongoose.model('Book', BookSchema);