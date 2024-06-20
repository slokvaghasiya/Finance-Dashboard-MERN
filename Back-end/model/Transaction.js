const mongoose = require("mongoose")
const { loadType } = require("mongoose-currency")

const Schema = mongoose.Schema;
loadType(mongoose)

const transactionsSchema = new Schema({
    buyer: {
        type: String,
        required: true
    },
    amount: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    productIds: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
}, {
    timestamps: true,
    toJson: { getters: true }
}
)

const Transaction = mongoose.model('Transaction', transactionsSchema)

module.exports = Transaction