const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    img: String,
    size: Number,
    time: Number,
    desc: String,
    ingr: [String],
    steps: [String],
    lastViewed: Date
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe