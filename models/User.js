const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
