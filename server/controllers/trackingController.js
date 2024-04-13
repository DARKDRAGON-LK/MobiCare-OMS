// controllers/trackingController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const Tracking = db.Tracking;

// Controller functions
const getAllTrackings = async (req, res) => {
  try {
    const trackings = await Tracking.findAll();
    res.json(trackings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrackingByNumber = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  try {
    const tracking = await Tracking.findByPk(trackingNumber);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTracking = async (req, res) => {
  const { TrackingNumber, Description, SaleID } = req.body;
  try {
    const tracking = await Tracking.create({ TrackingNumber, Description, SaleID });
    res.status(201).json(tracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTracking = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  const { Description, SaleID } = req.body;
  try {
    let tracking = await Tracking.findByPk(trackingNumber);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    // Update tracking attributes
    tracking.Description = Description;
    tracking.SaleID = SaleID;
    tracking = await tracking.save();
    res.json(tracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTracking = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  try {
    const tracking = await Tracking.findByPk(trackingNumber);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    await tracking.destroy();
    res.json({ message: 'Tracking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTrackings,
  getTrackingByNumber,
  createTracking,
  updateTracking,
  deleteTracking,
};
