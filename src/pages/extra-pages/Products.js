import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Axios request to fetch data
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const columns = [
    { field: 'Code', headerName: 'Code', width: 50 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'BrandID', headerName: 'Brand ID', width: 100 },
    { field: 'CategoryID', headerName: 'Category ID', width: 100 },
    { field: 'ColourID', headerName: 'Colour ID', width: 100 },
    { field: 'TypeID', headerName: 'Type ID', width: 100 },
    { field: 'Cost', headerName: 'Cost', width: 100 },
    { field: 'SellingPrice', headerName: 'Selling Price', width: 100 },
    { field: 'UserID', headerName: 'User ID', width: 100 },
    { field: 'createdAt', headerName: 'Created At', width: 100 },
    { field: 'updatedAt', headerName: 'Updated At', width: 100 }
  ];

  return (
    <MainCard title="Products">
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
    </MainCard>
  );
};

export default Products;
