// controllers/orderCostController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const OrderCost = db.OrderCost;

// Controller functions
const getAllOrderCosts = async (req, res) => {
  try {
    const orderCosts = await OrderCost.findAll();
    res.json(orderCosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderCostByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orderCost = await OrderCost.findOne({ where: { OrderID: orderId } });
    if (!orderCost) {
      return res.status(404).json({ message: 'Order cost not found for order ID ' + orderId });
    }
    res.json(orderCost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrderCost = async (req, res) => {
  const { OrderID, DeliveryCost, AdditionalCost, UserID } = req.body;
  try {
    const orderCost = await OrderCost.create({ OrderID, DeliveryCost, AdditionalCost, UserID });
    res.status(201).json(orderCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrderCost = async (req, res) => {
  const orderId = req.params.orderId;
  const { DeliveryCost, AdditionalCost, UserID } = req.body;
  try {
    let orderCost = await OrderCost.findOne({ where: { OrderID: orderId } });
    if (!orderCost) {
      return res.status(404).json({ message: 'Order cost not found for order ID ' + orderId });
    }
    // Update order cost attributes
    orderCost.DeliveryCost = DeliveryCost;
    orderCost.AdditionalCost = AdditionalCost;
    orderCost.UserID = UserID;
    orderCost = await orderCost.save();
    res.json(orderCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrderCost = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orderCost = await OrderCost.findOne({ where: { OrderID: orderId } });
    if (!orderCost) {
      return res.status(404).json({ message: 'Order cost not found for order ID ' + orderId });
    }
    await orderCost.destroy();
    res.json({ message: 'Order cost deleted successfully for order ID ' + orderId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrderCosts,
  getOrderCostByOrderId,
  createOrderCost,
  updateOrderCost,
  deleteOrderCost,
};
