require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const productRouter = require("./routes/products");
app.use("/products", productRouter);

const authRouter = require("./routes/authRoutes");
app.use(authRouter);

const orderRoutes = require("./routes/orderRoutes");
app.use(orderRoutes);

app.listen(3000, () => console.log("Server started"));
