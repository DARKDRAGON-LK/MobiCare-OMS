// controllers/stockController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const Stock = db.Stock;

// Controller functions
// const getAllStocks = async (req, res) => {
//   try {
//     const stocks = await Stock.findAll();
//     res.json(stocks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: [
        {
          model: db.Product,
          attributes: ['Code', 'Name', 'BrandID', 'CategoryID', 'ColourID', 'TypeID'],
          include: [
            { model: db.Brand, attributes: ['Name'] },
            { model: db.Category, attributes: ['Name'] },
            { model: db.Colour, attributes: ['Name'] },
            { model: db.Type, attributes: ['Name'] }
          ]
        }
      ],
      attributes: ['Quantity']
    });
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

const deductStockFromOrder = async (req, res) => {
  const orderProducts = req.body.orderProducts; // Assuming orderProducts is an array of products with Code and quantity
  try {
    for (const product of orderProducts) {
      const stock = await Stock.findOne({ where: { ProductCode: product.Code } });
      if (!stock) {
        return res.status(404).json({ message: `Stock not found for product code ${product.Code}` });
      }
      // Deduct the quantity from stock
      stock.Quantity -= product.quantity;
      await stock.save();
    }
    res.status(200).json({ message: 'Stock deducted successfully for order products' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrUpdateStock = async (req, res) => {
  const { ProductCode, Quantity, UserID } = req.body;
  try {
    let stock = await Stock.findOne({ where: { ProductCode } });
    if (stock) {
      // If stock exists, update its quantity
      stock.Quantity += Quantity;
      stock.UserID = 1;
      await stock.save();
    } else {
      // If stock doesn't exist, create a new one
      stock = await Stock.create({ ProductCode, Quantity, UserID });
    }
    res.status(201).json(stock);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};



module.exports = {
  deductStockFromOrder,
  getAllStocks,
  getStockByProductCode,
  createStock,
  createOrUpdateStock,
  updateStock,
  deleteStock,
};
