const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No name'
    },
    author: {
        type: String,
        default: 'Unknown'
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
    id:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('musics', musicSchema)