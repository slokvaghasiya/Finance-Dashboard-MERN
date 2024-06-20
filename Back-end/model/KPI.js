const mongoose = require("mongoose")
const { loadType } = require("mongoose-currency")

const Schema = mongoose.Schema;
loadType(mongoose)

const daySchema = new Schema({
    date: String,
    revenue: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    expenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },

}, {
    toJson: { getters: true }
})

const monthSchema = new Schema({
    month: String,
    revenue: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    expenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    operationalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    nonOperationalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
}, {
    toJson: { getters: true }
})

const KPISchema = new Schema({
    totalProfit: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    totalRevenue: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    totalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (cvalue) => cvalue / 100
    },
    expensesByCategory: {
        type: Map,
        of: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (cvalue) => cvalue / 100
        }
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema]
},{
    timestamps:true,
    toJson: { getters: true }
}
)

const KIP = mongoose.model('KPI', KPISchema)

module.exports = KIP