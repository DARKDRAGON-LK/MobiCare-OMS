import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import CustomSnackbar from 'components/CustomSnackbar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [colour, setColour] = useState([]);
  const [type, setType] = useState([]);
  const [brand, setBrand] = useState([]);
  const [showAddSucessAlert, setShowAddSucessAlert] = useState(false);
  const [showEditSucessAlert, setShowEditSucessAlert] = useState(false);
  const [showDeleteSucessAlert, setShowDeleteSucessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [newProduct, setNewProduct] = useState({
    Code: '',
    Name: '',
    TypeID: '',
    BrandID: '',
    CategoryID: '',
    ColourID: '',
    Cost: '',
    SellingPrice: '',
    UserID: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    fetchData();
    fetchBrandData();
    fetchCateData();
    fetchColourData();
    fetchTypeData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        const modifiedProducts = response.data.map((product) => ({
          ...product,
          id: product.Code, // Use 'Code' as 'id'
          createdAt: new Date(product.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }), // Convert createdAt to +5:30
          updatedAt: new Date(product.updatedAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }), // Convert updatedAt to +5:30
          SellingPrice: 'Rs.' + product.SellingPrice,
          Cost: 'Rs.' + product.Cost
        }));
        setProducts(modifiedProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };
  const fetchCateData = () => {
    axios
      .get('http://localhost:5000/categories')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchTypeData = () => {
    axios
      .get('http://localhost:5000/types')
      .then((response) => {
        setType(response.data);
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
      });
  };

  const fetchColourData = () => {
    axios
      .get('http://localhost:5000/colours')
      .then((response) => {
        setColour(response.data);
      })
      .catch((error) => {
        console.error('Error fetching colours:', error);
      });
  };

  const fetchBrandData = () => {
    axios
      .get('http://localhost:5000/brands')
      .then((response) => {
        setBrand(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  };

  const addProduct = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: value
    });
    console.log(newProduct);
  };

  const handleAddProduct = () => {
    // Add createdAt and updatedAt fields with current date and time
    const currentDate = new Date();
    const updatedProduct = {
      ...newProduct,
      createdAt: currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
      updatedAt: currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };

    // Make an API call to add the new product
    axios
      .post('http://localhost:5000/products', updatedProduct)
      .then((response) => {
        console.log('Product added successfully:', response.data);
        setShowAddSucessAlert(true);
        // Reset new product state
        setNewProduct({
          Code: '',
          Name: '',
          TypeID: '',
          BrandID: '',
          CategoryID: '',
          ColourID: '',
          Cost: '',
          SellingPrice: '',
          UserID: '',
          createdAt: '',
          updatedAt: ''
        });
        // Close the dialog
        setOpenDialog(false);
        // Refetch data to update the product list
        fetchData();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        setShowErrorAlert(true);
        // Handle error if necessary
      });
  };

  const handleEditProduct = (id) => {
    console.log(id);
    setShowEditSucessAlert(true);
  };

  const handleDeleteProduct = (row) => {
    let id = row.Code;
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((response) => {
        console.log('Product deleted successfully:', response.data);
        setShowDeleteSucessAlert(true);
        // Refetch data to update the product list
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        setShowErrorAlert(true);
        // Handle error if necessary
      });
  };

  const handleCloseSnackbar = () => {
    setShowErrorAlert(false);
    setShowAddSucessAlert(false);
    setShowEditSucessAlert(false);
    setShowDeleteSucessAlert(false);
  };

  const columns = [
    { field: 'Code', headerName: 'Code', width: 80 },
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'TypeName', headerName: 'Type', width: 100 },
    { field: 'BrandName', headerName: 'Brand', width: 90 },
    { field: 'CategoryName', headerName: 'Category', width: 70 },
    { field: 'ColourName', headerName: 'Colour', width: 70 },
    { field: 'Cost', headerName: 'Cost', width: 90 },
    { field: 'SellingPrice', headerName: 'Sale Price', width: 90 },
    { field: 'UserID', headerName: 'User ID', width: 100 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{maxWidth:'5px'}}>
          <Button
            variant="contained"
            color="primary"
            sx={{ maxWidth: '5px', width: '5px' }} // Corrected syntax
            onClick={() => handleEditProduct(params.row)}
          >
            <EditOutlined />
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ maxWidth: '5px', width: '5px', marginLeft: '5px' }} // Adjust values as needed
            onClick={() => handleDeleteProduct(params.row)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      )
    }
  ];

  return (
    <MainCard>
      <CustomSnackbar
        open={showAddSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Product Added Successfully!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showEditSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Product Edited!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showDeleteSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Product Deleted!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showErrorAlert}
        onClose={handleCloseSnackbar}
        severity="error" // Pass the severity based on your logic
        titlename="Error:"
        message="Something went wrong, Please try again!" // Pass the message based on your logic
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Products</h2>
        <div>
          <Button variant="contained" color="warning" style={{ margin: 10, height: '100%' }} onClick={fetchData}>
            <ReloadOutlined style={{ fontSize: '1.4rem' }} />
          </Button>
          <Button variant="contained" style={{ height: '100%' }} onClick={addProduct}>
            Add Product
          </Button>
        </div>
      </div>

      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ style: { minWidth: '600px' } }}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField name="Name" label="Name" value={newProduct.Name} onChange={handleInputChange} fullWidth margin="normal" />
          <InputLabel sx={{ marginBottom: '5px' }}>Type</InputLabel>
          <Select
            required
            fullWidth
            name="TypeID"
            label="Type"
            variant="outlined"
            value={newProduct.TypeID}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px', color: 'black' }}
          >
            {type.map((type) => (
              <MenuItem key={type.TypeID} value={type.TypeID}>
                {type.Name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{ marginBottom: '5px' }}>Brand</InputLabel>
          <Select
            required
            fullWidth
            name="BrandID"
            label="Brand"
            variant="outlined"
            value={newProduct.BrandID}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          >
            {brand.map((b) => (
              <MenuItem key={b.BrandID} value={b.BrandID}>
                {b.Name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{ marginBottom: '5px' }}>Category</InputLabel>
          <Select
            required
            fullWidth
            name="CategoryID"
            label="Category"
            variant="outlined"
            value={newProduct.CategoryID}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          >
            {category.map((cat) => (
              <MenuItem key={cat.CategoryID} value={cat.CategoryID}>
                {cat.Name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{ marginBottom: '5px' }}>Colour</InputLabel>
          <Select
            required
            fullWidth
            name="ColourID"
            label="Colour"
            variant="outlined"
            value={newProduct.ColourID}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          >
            {colour.map((c) => (
              <MenuItem key={c.ColourID} value={c.ColourID}>
                {c.Name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{ marginBottom: '5px' }}>Cost</InputLabel>
          <OutlinedInput
            type="number"
            id="outlined-adornment-amount"
            name="Cost"
            startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
            label="Cost"
            value={newProduct.Cost}
            onChange={handleInputChange}
            fullWidth
          />
          <InputLabel sx={{ marginBottom: '5px' }}>Sale Price</InputLabel>
          <OutlinedInput
            type="number"
            name="SellingPrice"
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
            label="Sale Price"
            value={newProduct.SellingPrice}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Products;
