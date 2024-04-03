const db = require('../models');

exports.createColour = async (req, res) => {
  try {
    const { Name } = req.body;
    const colour = await db.Colour.create({ Name });
    res.status(201).json(colour);
  } catch (error) {
    console.error('Error creating colour:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllColours = async (req, res) => {
  try {
    const colours = await db.Colour.findAll();
    res.json(colours);
  } catch (error) {
    console.error('Error fetching colours:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getColourById = async (req, res) => {
  try {
    const { id } = req.params;
    const colour = await db.Colour.findByPk(id);
    if (!colour) {
      res.status(404).json({ error: 'Colour not found' });
    } else {
      res.json(colour);
    }
  } catch (error) {
    console.error('Error fetching colour by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateColour = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;
    const colour = await db.Colour.findByPk(id);
    if (!colour) {
      return res.status(404).json({ error: 'Colour not found' });
    }
    await colour.update({ Name });
    res.json(colour);
  } catch (error) {
    console.error('Error updating colour:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteColour = async (req, res) => {
  try {
    const { id } = req.params;
    const colour = await db.Colour.findByPk(id);
    if (!colour) {
      return res.status(404).json({ error: 'Colour not found' });
    }
    await colour.destroy();
    res.json({ message: 'Colour deleted successfully' });
  } catch (error) {
    console.error('Error deleting colour:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
