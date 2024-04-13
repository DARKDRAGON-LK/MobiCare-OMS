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
import CustomSnackbar from 'components/CustomSnackbar';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/customers')
      .then((response) => {
        const modifiedCustomers = response.data.map((customer) => ({
          ...customer,
          id: customer.CustomerID // Use 'Code' as 'id'
        }));
        setCustomers(modifiedCustomers);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  };

  const addCustomer = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditDialogOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedCustomer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  const handleInputEditChange = (e) => {
    const { name, value } = e.target;

    setSelectedCustomer({
      ...selectedCustomer,
      [name]: value
    });
  };

  const handleAddCustomer = () => {
    axios
      .post('http://localhost:5000/customers', newCustomer)
      .then((response) => {
        console.log('Customer added successfully:', response.data);
        setShowAddSuccessAlert(true);
        setNewCustomer({
          CustomerName: '',
          Address: '',
          City: '',
          District: '',
          ContactNumber: '',
          MobileNumber: '',
          SocialMediaPlaform: '',
          UserID: ''
        });
        setOpenDialog(false);
        fetchData();
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
        setShowErrorAlert(true);
      });
  };

  const handleUpdateCustomer = () => {
    axios
      .put(`http://localhost:5000/customers/${selectedCustomer.CustomerID}`, selectedCustomer)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);
        setShowEditSuccessAlert(true);
        handleEditDialogClose();
        fetchData();
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        setShowErrorAlert(true);
      });
  };

  const handleDeleteCustomer = (id) => {
    axios
      .delete(`http://localhost:5000/customers/${id}`)
      .then((response) => {
        console.log('Customer deleted successfully:', response.data);
        setShowDeleteSuccessAlert(true);
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
        setShowErrorAlert(true);
      });
  };

  const handleCloseSnackbar = () => {
    setShowErrorAlert(false);
    setShowAddSuccessAlert(false);
    setShowEditSuccessAlert(false);
    setShowDeleteSuccessAlert(false);
  };

  const columns = [
    { field: 'CustomerID', headerName: 'Customer ID', width: 120 },
    { field: 'CustomerName', headerName: 'Name', width: 200 },
    { field: 'Address', headerName: 'Address', width: 200 },
    { field: 'City', headerName: 'City', width: 150 },
    { field: 'District', headerName: 'District', width: 150 },
    { field: 'ContactNumber', headerName: 'Contact Number', width: 180 },
    { field: 'MobileNumber', headerName: 'Mobile Number', width: 180 },
    { field: 'SocialMediaPlaform', headerName: 'Social Media', width: 180 },
    { field: 'UserID', headerName: 'User ID', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="contained" color="primary" onClick={() => handleEditDialogOpen(params.row)} startIcon={<EditOutlined />}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteCustomer(params.row.CustomerID)}
            startIcon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <MainCard>
      <CustomSnackbar
        open={showAddSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Customer Added Successfully!"
      />
      <CustomSnackbar
        open={showEditSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Customer Edited Successfully!"
      />
      <CustomSnackbar
        open={showDeleteSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Customer Deleted Successfully!"
      />
      <CustomSnackbar
        open={showErrorAlert}
        onClose={handleCloseSnackbar}
        severity="error"
        titlename="Error:"
        message="Something went wrong, Please try again!"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Customers</h2>
        <div>
          <Button variant="contained" color="warning" style={{ margin: 10, height: '100%' }} onClick={fetchData}>
            <ReloadOutlined style={{ fontSize: '1.4rem' }} />
          </Button>
          <Button variant="contained" style={{ height: '100%' }} onClick={addCustomer}>
            Add Customer
          </Button>
        </div>
      </div>
      <div style={{ height: '60vh', width: '95%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ style: { minWidth: '600px' } }}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="CustomerName"
            label="Customer Name"
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
            label="Social Media Platform"
            value={newCustomer.SocialMediaPlaform}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField name="UserID" label="User ID" value={newCustomer.UserID} onChange={handleInputChange} fullWidth margin="normal" />
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
      <Dialog open={openEditDialog} onClose={handleEditDialogClose} PaperProps={{ style: { minWidth: '600px' } }}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="CustomerName"
            label="Customer Name"
            value={selectedCustomer ? selectedCustomer.CustomerName : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="Address"
            label="Address"
            value={selectedCustomer ? selectedCustomer.Address : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="City"
            label="City"
            value={selectedCustomer ? selectedCustomer.City : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="District"
            label="District"
            value={selectedCustomer ? selectedCustomer.District : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="ContactNumber"
            label="Contact Number"
            value={selectedCustomer ? selectedCustomer.ContactNumber : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="MobileNumber"
            label="Mobile Number"
            value={selectedCustomer ? selectedCustomer.MobileNumber : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="SocialMediaPlaform"
            label="Social Media Platform"
            value={selectedCustomer ? selectedCustomer.SocialMediaPlaform : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="UserID"
            label="User ID"
            value={selectedCustomer ? selectedCustomer.UserID : ''}
            onChange={handleInputEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdateCustomer} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Customers;
