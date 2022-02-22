const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  index: { type: String, required: true, unique: true},
  longitude: { type: Number, required: true},
  latitude: { type: Number, required: true},
})

module.exports = mongoose.model('Location', locationSchema)