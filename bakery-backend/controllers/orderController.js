const Order = require("../models/Order");
const Product = require("../models/Product");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {

    const { products, totalPrice } = req.body;

    // Validate stock
    for (const item of products) {

      const product =
        await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      if (
        item.quantity > product.stock
      ) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} items left`
        });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      totalPrice
    });

    // Reduce stock
    for (const item of products) {

      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders,getAllOrders,updateOrderStatus};