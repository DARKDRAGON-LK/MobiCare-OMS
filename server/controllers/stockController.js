// controllers/stockController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const Stock = db.Stock;

// Controller functions
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStockByProductCode = async (req, res) => {
  const productCode = req.params.productCode;
  try {
    const stock = await Stock.findOne({ where: { ProductCode: productCode } });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found for product code ' + productCode });
    }
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStock = async (req, res) => {
  const { ProductCode, Quantity, UserID } = req.body;
  try {
    const stock = await Stock.create({ ProductCode, Quantity, UserID });
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStock = async (req, res) => {
  const productCode = req.params.productCode;
  const { Quantity, UserID } = req.body;
  try {
    let stock = await Stock.findOne({ where: { ProductCode: productCode } });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found for product code ' + productCode });
    }
    // Update stock attributes
    stock.Quantity = Quantity;
    stock.UserID = UserID;
    stock = await stock.save();
    res.json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStock = async (req, res) => {
  const productCode = req.params.productCode;
  try {
    const stock = await Stock.findOne({ where: { ProductCode: productCode } });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found for product code ' + productCode });
    }
    await stock.destroy();
    res.json({ message: 'Stock deleted successfully for product code ' + productCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStocks,
  getStockByProductCode,
  createStock,
  updateStock,
  deleteStock,
};
