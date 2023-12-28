const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const productDetails = req.body.products;

    let products = await Promise.all(
      productDetails.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          productId: product._id,
          name: product.name,
          priceAtOrder: product.price,
          quantity: item.quantity,
        };
      })
    );

    let aggregatedProducts = [];
    products.forEach((product) => {
      let existingProduct = aggregatedProducts.find((p) =>
        p.productId.equals(product.productId)
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        aggregatedProducts.push(product);
      }
    });

    const newOrder = new Order({ user: userId, products: aggregatedProducts });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send({ message: "error creating order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId });

    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: "Error fetching orders" });
  }
};
