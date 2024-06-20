const { Router } = require("express")
const KPI = require("../model/KPI")

const KpiRoutes = Router();

KpiRoutes.get('/kpis', async (req, res) => {
    try {
        const kips = await KPI.find();
        res.status(200).json(kips)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = KpiRoutes