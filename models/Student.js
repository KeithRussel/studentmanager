const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  imgUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  block: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('student', StudentSchema);
