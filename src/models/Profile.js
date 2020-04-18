const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
});

mongoose.model('Profile', ProfileSchema);