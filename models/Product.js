const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // دیگر فیلدهای مورد نیاز
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
