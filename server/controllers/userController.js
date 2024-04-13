// controllers/userController.js
const db = require('../models'); // Assuming your Sequelize models are in the '../models' directory
const User = db.User;

// Controller functions
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { Email, FullName, ContactNumber, Permission_Type, Password } = req.body;
  try {
    const user = await User.create({ Email, FullName, ContactNumber, Permission_Type, Password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { Email, FullName, ContactNumber, Permission_Type, Password } = req.body;
  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update user attributes
    user.Email = Email;
    user.FullName = FullName;
    user.ContactNumber = ContactNumber;
    user.Permission_Type = Permission_Type;
    user.Password = Password;
    user = await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
