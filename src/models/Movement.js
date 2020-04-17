const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MovementSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

MovementSchema.plugin(mongoosePaginate);
mongoose.model('Movement', MovementSchema);