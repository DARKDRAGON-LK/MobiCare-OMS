// controllers/customerController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const Customer = db.Customer;

// Controller functions
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { CustomerName, Address, City, District, ContactNumber, MobileNumber, SocialMediaPlaform, UserID } = req.body;
  try {
    const customer = await Customer.create({ CustomerName, Address, City, District, ContactNumber, MobileNumber, SocialMediaPlaform, UserID });
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const { CustomerName, Address, City, District, ContactNumber, MobileNumber, SocialMediaPlaform, UserID } = req.body;
  try {
    let customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    customer.CustomerName = CustomerName;
    customer.Address = Address;
    customer.City = City;
    customer.District = District;
    customer.ContactNumber = ContactNumber;
    customer.MobileNumber = MobileNumber;
    customer.SocialMediaPlaform = SocialMediaPlaform;
    customer.UserID = UserID;
    customer = await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.destroy();
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
