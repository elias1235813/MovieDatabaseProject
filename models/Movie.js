const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: Number,
    director: Array,
    runtime: String,
    rating: Number,
    description: String,
    genre: Array,
    image: String
})

module.exports = mongoose.model("Movie", movieSchema);