const db = require('../models');

exports.createType = async (req, res) => {
  try {
    const { Name } = req.body;
    const type = await db.Type.create({ Name });
    res.status(201).json(type);
  } catch (error) {
    console.error('Error creating type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = await db.Type.findAll();
    res.json(types);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await db.Type.findByPk(id);
    if (!type) {
      res.status(404).json({ error: 'Type not found' });
    } else {
      res.json(type);
    }
  } catch (error) {
    console.error('Error fetching type by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;
    const type = await db.Type.findByPk(id);
    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }
    await type.update({ Name });
    res.json(type);
  } catch (error) {
    console.error('Error updating type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await db.Type.findByPk(id);
    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }
    await type.destroy();
    res.json({ message: 'Type deleted successfully' });
  } catch (error) {
    console.error('Error deleting type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
