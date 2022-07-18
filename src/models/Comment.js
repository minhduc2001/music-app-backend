const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    music:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'musics',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);