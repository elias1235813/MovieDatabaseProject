const mongoose = require('mongoose');

const movieAddSchema = new mongoose.Schema({
    title: {
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
});

module.exports = mongoose.model("Movie", movieAddSchema);
