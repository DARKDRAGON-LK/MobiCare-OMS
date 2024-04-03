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
import { ReloadOutlined } from '@ant-design/icons';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Code: '',
    Name: '',
    TypeName: '',
    BrandName: '',
    CategoryName: '',
    ColourName: '',
    Cost: '',
    SellingPrice: '',
    UserID: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    fetchData();
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
  };

  const handleAddProduct = () => {
    // Implement logic to add product
    // For example, you can make an API call to add the new product
    console.log('Adding product:', newProduct);
    // Reset new product state
    setNewProduct({
      Code: '',
      Name: '',
      TypeName: '',
      BrandName: '',
      CategoryName: '',
      ColourName: '',
      Cost: '',
      SellingPrice: '',
      UserID: '',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    // Close the dialog
    setOpenDialog(false);
    // Refetch data to update the product list
    fetchData();
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
    { field: 'createdAt', headerName: 'Created At', width: 150 }
  ];

  return (
    <MainCard>
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

      <div style={{ height: '60vh', width: '95%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField name="Code" label="Code" value={newProduct.Code} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="Name" label="Name" value={newProduct.Name} onChange={handleInputChange} fullWidth margin="normal" />
          {/* Add other input fields for product details */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
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
