// controllers/productController.js
const db = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const { Code, Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice } = req.body;
    const query = `
      INSERT INTO Products (Code, Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.sequelize.query(query, {
      replacements: [Code, Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice],
      type: db.sequelize.QueryTypes.INSERT
    });
    const newProductId = result[0];
    const newProduct = await db.sequelize.query('SELECT * FROM Products WHERE Code = ?', {
      replacements: [newProductId],
      type: db.sequelize.QueryTypes.SELECT
    });
    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.sequelize.query(`
      SELECT p.*, b.Name AS BrandName, c.Name AS CategoryName, co.Name AS ColourName, t.Name AS TypeName
      FROM Products p
      LEFT JOIN Brands b ON p.BrandID = b.BrandID
      LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
      LEFT JOIN Colours co ON p.ColourID = co.ColourID
      LEFT JOIN Types t ON p.TypeID = t.TypeID
    `, {
      type: db.sequelize.QueryTypes.SELECT
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.sequelize.query(`
      SELECT p.*, b.Name AS BrandName, c.Name AS CategoryName, co.Name AS ColourName, t.Name AS TypeName
      FROM Products p
      LEFT JOIN Brands b ON p.BrandID = b.BrandID
      LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
      LEFT JOIN Colours co ON p.ColourID = co.ColourID
      LEFT JOIN Types t ON p.TypeID = t.TypeID
      WHERE p.Code = ?
    `, {
      replacements: [id],
      type: db.sequelize.QueryTypes.SELECT
    });
    if (!product[0]) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product[0]);
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice } = req.body;
    const query = `
      UPDATE Products
      SET Name = ?, TypeID = ?, CategoryID = ?, BrandID = ?, ColourID = ?, Cost = ?, SellingPrice = ?
      WHERE Code = ?
    `;
    await db.sequelize.query(query, {
      replacements: [Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice, id],
      type: db.sequelize.QueryTypes.UPDATE
    });
    const updatedProduct = await db.sequelize.query('SELECT * FROM Products WHERE Code = ?', {
      replacements: [id],
      type: db.sequelize.QueryTypes.SELECT
    });
    res.json(updatedProduct[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM Products WHERE Code = ?';
    await db.sequelize.query(query, {
      replacements: [id],
      type: db.sequelize.QueryTypes.DELETE
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
