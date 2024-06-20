const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const KpiRoutes = require("./routes/kpiRoutes")
const productRoutes = require("./routes/productRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const KPIModel = require("./model/KPI")
const ProductModel = require("./model/Product")
const transactionModel = require("./model/Transaction")
const { kpis, products, transactions } = require("./data/data")


dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use("/kpi", KpiRoutes)
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes)

mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    app.listen(PORT, () => console.log("Connection Success"))

    // KPIModel.insertMany(kpis);
    // ProductModel.insertMany(products);
    // transactionModel.insertMany(transactions);

}).catch((error) => console.log(`${error} not connect`))