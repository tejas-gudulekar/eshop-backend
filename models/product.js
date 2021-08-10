const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
        default: ''
    }],
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 1,
        max: 400,
    },
    rating: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;