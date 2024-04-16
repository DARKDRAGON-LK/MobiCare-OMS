// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete
} from '@mui/material';
import MainCard from 'components/MainCard';
import axios from 'axios'; // for making HTTP requests

const Stocks = () => {
  // State variables
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [newStockData, setNewStockData] = useState({
    ProductCode: '',
    Quantity: 0,
    UserID: '' // Assuming you have a way to get the UserID
  });

  // Fetch stocks from the server
  useEffect(() => {
    fetchStocks();
    fetchProductData();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stocks'); // Assuming your API endpoint for getting all stocks is '/api/stocks'
      console.log(response.data);
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const fetchProductData = () => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  // Handler for live search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handler for opening the add stock dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handler for closing the add stock dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handler for adding new stock
  // Handler for adding new stock
  const handleAddStock = async () => {
    try {
      // Check if stock with the same product code already exists
      const existingStockIndex = stocks.findIndex((stock) => stock.ProductCode === newStockData.ProductCode);
      let updatedStocks;
      setNewStockData({
        ...newStockData,
        UserID: 1
      });
      updatedStocks = { ...updatedStocks, UserID: 1 };
      if (existingStockIndex !== -1) {
        // If stock exists, update its quantity
        const existingStock = stocks[existingStockIndex];
        const updatedStock = { ...existingStock, Quantity: existingStock.Quantity + newStockData.Quantity };
        updatedStocks = [...stocks];
        updatedStocks[existingStockIndex] = updatedStock;
      } else {
        // If stock doesn't exist, add it to the list
        updatedStocks = [...stocks, newStockData];
      }
      setStocks(updatedStocks);
      console.log(newStockData);
      // Make API call to update database
      await axios.post('http://localhost:5000/addstocks', newStockData);

      // Reset newStockData and close dialog
      setNewStockData({
        ProductCode: '',
        Quantity: 0,
        UserID: ''
      });
      setOpenDialog(false);

      // Fetch updated data from the server
      fetchStocks();
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  // Render the component
  return (
    <MainCard>
      <Typography variant="h5" component="h2" gutterBottom>
        Stocks
      </Typography>
      <TextField label="Search" variant="outlined" fullWidth value={searchTerm} onChange={handleSearch} style={{ marginBottom: '1rem' }} />
      <Button variant="contained" onClick={handleOpenDialog} style={{ marginBottom: '1rem' }}>
        Add Stock
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Code</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks
              .filter(
                (stock) =>
                  stock.Product &&
                  typeof stock.Product.Name === 'string' &&
                  stock.Product.Name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((stock) => (
                <TableRow key={stock.Product && stock.Product.Code}>
                  <TableCell>{stock.Product && stock.Product.Code}</TableCell>
                  <TableCell>{stock.Product && stock.Product.Name}</TableCell>
                  <TableCell>{stock.Product && stock.Product.Brand && stock.Product.Brand.Name}</TableCell>
                  <TableCell>{stock.Product && stock.Product.Category && stock.Product.Category.Name}</TableCell>
                  <TableCell>{stock.Product && stock.Product.Colour && stock.Product.Colour.Name}</TableCell>
                  <TableCell>{stock.Product && stock.Product.Type && stock.Product.Type.Name}</TableCell>
                  <TableCell>{stock.Quantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Stock Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Stock</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={products.map((product) => ({ label: product.Name, value: product.Code }))}
            value={newStockData.ProductCode}
            onChange={(event, newValue) => {
              setNewStockData({ ...newStockData, ProductCode: newValue ? newValue.value : '' });
            }}
            renderInput={(params) => <TextField {...params} label="Product Code" variant="outlined" />}
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={newStockData.Quantity}
            onChange={(e) => setNewStockData({ ...newStockData, Quantity: parseInt(e.target.value) || 0 })}
            style={{ marginBottom: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddStock} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Stocks;
