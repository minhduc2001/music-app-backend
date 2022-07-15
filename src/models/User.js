const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    phone: {
        require: true,
        unique: true,
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
    ,
    name: {
        type: String,
    },
    avatar: {
        public_id: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema);