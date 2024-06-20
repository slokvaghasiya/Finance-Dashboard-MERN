const mongoose = require("mongoose")
const { loadType } = require("mongoose-currency")

const Schema = mongoose.Schema;
loadType(mongoose)

const ProductSchema = new Schema({
    price: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    expense: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref:"Transaction"
    }],
},{
    timestamps:true,
    toJson: { getters: true }
}
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product