const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let twittSchema = new Schema({
  twit:{
    type: String,
    required: true
  },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Twitter', twittSchema);
