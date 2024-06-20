const { Router } = require("express")
const transaction = require("../model/Transaction")

const transactionRoutes = Router();

transactionRoutes.get('/transactions', async (req, res) => {
    try {
        const transactions = await transaction.find().limit(50).sort({ createdAt: -1 });
        res.status(200).json(transactions)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = transactionRoutes