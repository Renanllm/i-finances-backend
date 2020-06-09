const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  balance: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('Profile', ProfileSchema);