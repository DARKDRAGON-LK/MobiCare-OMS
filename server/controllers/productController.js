// controllers/productController.js
const db = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const { Code, Name, Type, Category, Brand, Colour, Cost, SellingPrice } = req.body;
    const newProduct = await db.Product.create({
      Code,
      Name,
      Type,
      Category,
      Brand,
      Colour,
      Cost,
      SellingPrice,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Type, Category, Brand, Colour, Cost, SellingPrice } = req.body;
    const product = await db.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      await product.update({
        Name,
        Type,
        Category,
        Brand,
        Colour,
        Cost,
        SellingPrice,
      });
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
