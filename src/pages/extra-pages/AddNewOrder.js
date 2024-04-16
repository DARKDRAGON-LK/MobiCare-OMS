import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
  Divider,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

// project import
import MainCard from 'components/MainCard';

const AddNewOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [lastSaleID, setLastSaleID] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [trackingDetails, setTrackingDetails] = useState('');
  const [socialMediaPlatform, setSocialMediaPlatform] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    CustomerName: '',
    Address: '',
    City: '',
    District: '',
    ContactNumber: '',
    MobileNumber: '',
    SocialMediaPlaform: '',
    UserID: ''
  });

  useEffect(() => {
    fetchCustomerData();
    fetchProductData();
    fetchLastSaleID();
    // eslint-disable-next-line
  }, []);

  const fetchCustomerData = () => {
    axios
      .get('http://localhost:5000/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  };

  const fetchProductData = () => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
        addQuantity();
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const addQuantity = () => {
    products.forEach((product) => {
      axios
        .get(`http://localhost:5000/stocks/${product.Code}`)
        .then((response) => {
          product.quantity = response.data.Quantity; // Corrected access to quantity
          // You might want to do something with the product here,
          // for example, update the UI or call another function.
        })
        .catch((error) => {
          console.error('Error fetching stock quantity:', error);
          // Handle errors if needed
        });
    });
  }; // Added closing parenthesis for the function

  const fetchLastSaleID = () => {
    axios
      .get('http://localhost:5000/lastorderID')
      .then((response) => {
        setLastSaleID(response.data.lastSaleID);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.SellingPrice * product.quantity; // Corrected the property name to SellingPrice
    });
    setTotalPrice(total);
    setNetTotal(total);
  };

  // Function to handle adding item to the list
  const handleAddToList = () => {
    let updatedProducts;
    if (selectedProducts.find((product) => product.Code === selectedProduct.Code)) {
      updatedProducts = selectedProducts.map((product) =>
        product.Code === selectedProduct.Code ? { ...product, quantity: product.quantity + 1 } : product
      );
    } else {
      updatedProducts = [...selectedProducts, { ...selectedProduct, quantity: 1 }];
    }
    setSelectedProducts(updatedProducts);
    setSelectedProduct(null);
  };

  useEffect(() => {
    calculateTotalPrice();
    // eslint-disable-next-line
  }, [selectedProducts]);

  useEffect(() => {
    setNetTotal(totalPrice + deliveryCharges + additionalCharges);
    // eslint-disable-next-line
  }, [deliveryCharges]);

  useEffect(() => {
    setNetTotal(totalPrice + additionalCharges + deliveryCharges);
    // eslint-disable-next-line
  }, [additionalCharges]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  const handleAddCustomer = () => {
    const customer = {
      ...newCustomer,
      UserID: 1
    };
    axios
      .post('http://localhost:5000/customers', customer)
      .then((response) => {
        console.log('Customer added successfully:', response.data);
        handleCloseDialog();
        fetchCustomerData(); // Refresh the customer list
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
      });
  };

  const handleRemoveFromList = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity--;
    if (updatedProducts[index].quantity === 0) {
      updatedProducts.splice(index, 1);
    }
    setSelectedProducts(updatedProducts);
    calculateTotalPrice();
  };

  // Function to handle changes in delivery charges
  const handleDeliveryChargesChange = (event) => {
    const charges = parseFloat(event.target.value);
    setDeliveryCharges(charges);
  };

  // Function to handle changes in additional charges
  const handleAdditionalChargesChange = (event) => {
    const charges = parseFloat(event.target.value);
    setAdditionalCharges(charges);
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  // Function to handle changes in tracking details
  const handleTrackingDetailsChange = (event) => {
    setTrackingDetails(event.target.value);
  };

  // Function to handle changes in social media platform
  const handleSocialMediaPlatformChange = (event) => {
    setSocialMediaPlatform(event.target.value);
  };

  const handleCreateOrder = () => {
    const order = {
      SaleID: lastSaleID,
      Date: new Date(), // Replace with the actual date
      CustomerID: selectedCustomer.CustomerID,
      SocialMediaPlatform: socialMediaPlatform,
      Status: 'Processing',
      TrackingNumber: trackingDetails,
      PaymentType: paymentType,
      UserID: 1
    };

    const orderProducts = selectedProducts.map((product) => ({
      SaleID: lastSaleID,
      ProductID: product.Code,
      Quantity: product.quantity
    }));

    const OrderCost = {
      SaleID: lastSaleID,
      DeliveryCost: deliveryCharges,
      AdditionalCost: additionalCharges,
      UserID: 1
    };

    axios
      .post('http://localhost:5000/orders', order)
      .then((response) => {
        console.log('Order created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });

    axios
      .post('http://localhost:5000/order-products', orderProducts)
      .then((response) => {
        console.log('Order products created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating order products:', error);
      });

    axios
      .post('http://localhost:5000/order-costs', OrderCost)
      .then((response) => {
        console.log('Order cost created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating order cost:', error);
      });

    axios.post('http://localhost:5000/deduct-stock-from-order', { orderProducts: selectedProducts });

    setSelectedCustomer(null);
    setSelectedProducts([]);
    setDeliveryCharges(0);
    setAdditionalCharges(0);
    setPaymentType('');
    setTrackingDetails('');
    setSocialMediaPlatform('');
    setNetTotal(0);
  };

  return (
    <MainCard title={`Order#${lastSaleID}`}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="customer-content" id="customer-header">
          <Typography>
            <strong>
              Select
              {selectedCustomer && selectedCustomer.CustomerName ? <strong>ed</strong> : ''} Customer
              {selectedCustomer && selectedCustomer.CustomerName ? ': ' : ''}
              {selectedCustomer && selectedCustomer.CustomerName && <strong>{selectedCustomer.CustomerName}</strong>}
            </strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <Autocomplete
              value={selectedCustomer}
              sx={{ width: '60%' }}
              onChange={(event, newValue) => {
                setSelectedCustomer(newValue);
              }}
              options={customers}
              getOptionLabel={(option) => `${option.CustomerName}  (${option.ContactNumber})`}
              renderInput={(params) => <TextField {...params} label="Customer" />}
            />
            <Button onClick={handleOpenDialog} variant="contained">
              Add Customer
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="product-content" id="product-header">
          <Typography>
            <strong>
              Select{selectedProducts.length ? <strong>ed</strong> : ''} Product
              {selectedProducts.length ? ': ' : ''}
              {selectedProducts.length > 0 && <strong>{selectedProducts.map((product) => product.Name).join(', ')}</strong>}
            </strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Autocomplete
              value={selectedProduct}
              onChange={(event, newValue) => {
                setSelectedProduct(newValue);
              }}
              options={products}
              getOptionLabel={(option) => option.Name}
              renderInput={(params) => <TextField {...params} label="Product" />}
            />
            <Button variant="contained" onClick={handleAddToList}>
              Add to List
            </Button>
            <Divider />
            <List>
              {selectedProducts.map((product, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={`${product.Name} (Qty: ${product.quantity})`} />
                    <ListItemSecondaryAction>
                      {product.SellingPrice * product.quantity}
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromList(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              <ListItem>
                <ListItemText primary="Total Price" />
                <ListItemSecondaryAction>
                  <strong>Rs.{totalPrice}</strong>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="charges-content" id="charges-header">
          <Typography>
            <strong>Additional Charges</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <TextField
              label="Delivery Charges"
              type="number"
              value={deliveryCharges}
              onChange={handleDeliveryChargesChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rs</InputAdornment>
              }}
            />

            <TextField
              label="Additional Charges"
              type="number"
              value={additionalCharges}
              onChange={handleAdditionalChargesChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rs</InputAdornment>
              }}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="payment-content" id="payment-header">
          <Typography>
            <strong>Additional Details</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <TextField label="Payment Type" select value={paymentType} onChange={handlePaymentTypeChange} fullWidth margin="normal">
              <MenuItem value="Cash">Bank Transfer</MenuItem>
              <MenuItem value="Online">COD</MenuItem>
              <MenuItem value="Online">KOKO</MenuItem>
            </TextField>
            <TextField label="Tracking Details" value={trackingDetails} onChange={handleTrackingDetailsChange} fullWidth margin="normal" />
            <TextField
              label="Social Media Platform"
              select
              value={socialMediaPlatform}
              onChange={handleSocialMediaPlatformChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="TikTok">TikTok</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="order-content" id="order-header">
          <Typography>
            <strong>Order Summary</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Typography variant="h5">Total Price: Rs. {netTotal}</Typography>
            <Button onClick={handleCreateOrder} variant="contained" color="primary">
              Create Order
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Add Customer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="CustomerName"
            label="Name"
            value={newCustomer.CustomerName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField name="Address" label="Address" value={newCustomer.Address} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="City" label="City" value={newCustomer.City} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="District" label="District" value={newCustomer.District} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField
            name="ContactNumber"
            label="Contact Number"
            value={newCustomer.ContactNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="MobileNumber"
            label="Mobile Number"
            value={newCustomer.MobileNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="SocialMediaPlaform"
            label="Social Media"
            value={newCustomer.SocialMediaPlaform}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddCustomer} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default AddNewOrder;
