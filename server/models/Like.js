const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({

}, { timestamps: true })

const Like = mongoose.model('like', likeSchema);

module.exports = {Like}