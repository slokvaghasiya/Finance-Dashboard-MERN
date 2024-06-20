const { Router } = require("express")
const Product = require("../model/Product")

const productRoutes = Router();

productRoutes.get('/products', async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = productRoutes