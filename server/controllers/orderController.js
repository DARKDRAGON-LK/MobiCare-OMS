// controllers/orderController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const Order = db.Order;

// Controller functions
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const { SaleID, Date, CustomerID, SocialMediaPlatform, ShippedDate, Status, TrackingNumber, PaymentType, UserID } = req.body;
  try {
    const order = await Order.create({ SaleID, Date, CustomerID, SocialMediaPlatform, ShippedDate, Status, TrackingNumber, PaymentType, UserID });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { SaleID, Date, CustomerID, SocialMediaPlatform, ShippedDate, Status, TrackingNumber, PaymentType, UserID } = req.body;
  try {
    let order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Update order attributes
    order.SaleID = SaleID;
    order.Date = Date;
    order.CustomerID = CustomerID;
    order.SocialMediaPlatform = SocialMediaPlatform;
    order.ShippedDate = ShippedDate;
    order.Status = Status;
    order.TrackingNumber = TrackingNumber;
    order.PaymentType = PaymentType;
    order.UserID = UserID;
    order = await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastSaleID = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({ order: [['createdAt', 'DESC']] });
    if (!lastOrder) {
      return res.status(404).json({ message: 'No orders found' });
    }
    const nextID = lastOrder.SaleID + 1;
    res.json({ lastSaleID: nextID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getLastSaleID,
};
