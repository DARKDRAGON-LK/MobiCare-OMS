const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module
const db = require('./models');
const productRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.json());

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Use the cors middleware to enable CORS for specific origins
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your client's origin
}));

// Load routes
app.use(productRoutes);

const PORT = process.env.PORT || 3000;

// Check database connectivity on startup
db.sequelize.sync().then(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection successful!');
    // Start the server only if database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Exit the application if database connection fails
    process.exit(1);
  }
});
