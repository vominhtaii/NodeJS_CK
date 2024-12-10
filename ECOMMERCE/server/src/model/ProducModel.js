const mongoose = require('mongoose')
const productShema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        image: { type: String, require: true },
        type: { type: String, require: true },
        price: { type: Number, require: true },
        countInStock: { type: Number, require: true },
        rating: { type: Number, require: true },
        description: { type: String },
        selled: { type: Number }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productShema)
module.exports = Product