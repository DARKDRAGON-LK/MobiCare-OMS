// controllers/productController.js
const db = require('../models');

// Function to fetch the last Code from the database
const getLastCode = async () => {
  try {
    const query = `
      SELECT MAX(Code) AS lastCode FROM Products
    `;
    const result = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    return result[0].lastCode || 0; // Return the lastCode or 0 if no products exist yet
  } catch (error) {
    console.error('Error fetching last product code:', error);
    throw error;
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice, createdAt, updatedAt } = req.body;

    // Fetch the last Code from the database
    let lastCode = await getLastCode();

    // Increment the last Code by 1 to get the new Code for the new product
    let newCode = lastCode + 1;

    let modifiedCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let modifiedUpdatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');


    // Insert the new product with the newCode
    const query = `
      INSERT INTO Products (Code, Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice,UserID,createdAt,updatedAt )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.sequelize.query(query, {
      replacements: [newCode, Name, TypeID, CategoryID, BrandID, ColourID, Cost, SellingPrice, null, modifiedCreatedAt, modifiedUpdatedAt],
      type: db.sequelize.QueryTypes.INSERT
    });

    // Fetch the newly inserted product
    const newProductId = result[0];
    const newProduct = await db.sequelize.query('SELECT * FROM Products WHERE Code = ?', {
      replacements: [newProductId],
      type: db.sequelize.QueryTypes.SELECT
    });

    // Respond with the newly inserted product
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
