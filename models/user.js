const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        defualt: ''
    },
    zip: {
        type: String,
        defualt: ''
    },
    country: {
        type: String,
        defualt: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;