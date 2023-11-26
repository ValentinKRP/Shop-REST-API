const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

//Getting all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const newPorduct = await product.save();
    res.status(201).json(newPorduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
