let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  jwt_version: {
    type: Number,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
