// controllers/orderProductController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const OrderProduct = db.OrderProduct;

// Controller functions
const getAllOrderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProduct.findAll();
    res.json(orderProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const orderProduct = await OrderProduct.findByPk(id);
    if (!orderProduct) {
      return res.status(404).json({ message: 'Order Product not found' });
    }
    res.json(orderProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrderProduct = async (req, res) => {
  const { OrderID, ProductCode, Quantity, UserID } = req.body;
  try {
    const orderProduct = await OrderProduct.create({ OrderID, ProductCode, Quantity, UserID });
    res.status(201).json(orderProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrderProduct = async (req, res) => {
  const id = req.params.id;
  const { OrderID, ProductCode, Quantity, UserID } = req.body;
  try {
    let orderProduct = await OrderProduct.findByPk(id);
    if (!orderProduct) {
      return res.status(404).json({ message: 'Order Product not found' });
    }
    // Update order product attributes
    orderProduct.OrderID = OrderID;
    orderProduct.ProductCode = ProductCode;
    orderProduct.Quantity = Quantity;
    orderProduct.UserID = UserID;
    orderProduct = await orderProduct.save();
    res.json(orderProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrderProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const orderProduct = await OrderProduct.findByPk(id);
    if (!orderProduct) {
      return res.status(404).json({ message: 'Order Product not found' });
    }
    await orderProduct.destroy();
    res.json({ message: 'Order Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrderProducts,
  getOrderProductById,
  createOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
};
