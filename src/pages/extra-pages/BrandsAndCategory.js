// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Delete, Add } from '@mui/icons-material'; // Import icons
import CustomSnackbar from 'components/CustomSnackbar';

// Project import
import MainCard from 'components/MainCard';

const BarndAndCategory = () => {
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showBrandAddSucessAlert, setShowBrandAddSucessAlert] = useState(false);
  const [showBrandEditSucessAlert, setShowBrandEditSucessAlert] = useState(false);
  const [showBrandDeleteSucessAlert, setShowBrandDeleteSucessAlert] = useState(false);
  const [showAddCategorySucessAlert, setShowAddCategorySucessAlert] = useState(false);
  const [showEditCategorySucessAlert, setShowEditCategorySucessAlert] = useState(false);
  const [showDeleteCategorySucessAlert, setShowDeleteCategorySucessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editData, setEditData] = useState({});
  const [addData, setAddData] = useState({
    Name: ''
    // Add other fields as needed for new data
  });

  useEffect(() => {
    fetchBrandData();
    fetchCateData();
  }, []);

  const fetchBrandData = () => {
    axios
      .get('http://localhost:5000/brands')
      .then((response) => {
        setBrand(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
        setShowErrorAlert(true);
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
        setShowErrorAlert(true);
      });
  };

  const handleEditDialogOpen = (data) => {
    setEditData(data);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleAddBrandDialogOpen = () => {
    setAddData({ Name: '', BrandID: true });
    setOpenAddDialog(true);
  };

  const handleAddCatergoryDialogOpen = () => {
    setAddData({ Name: '', CategoryID: true });
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEdit = () => {
    if (editData.BrandID) {
      // Editing brand data
      axios
        .put(`http://localhost:5000/brands/${editData.BrandID}`, editData)
        .then(() => {
          setShowBrandEditSucessAlert(true);
          fetchBrandData(); // Refresh brand data after editing
          handleEditDialogClose();
        })
        .catch((error) => {
          console.error('Error editing brand:', error);
          setShowErrorAlert(true);
        });
    } else if (editData.CategoryID) {
      // Editing category data
      axios
        .put(`http://localhost:5000/categories/${editData.CategoryID}`, editData)
        .then(() => {
          setShowEditCategorySucessAlert(true);
          fetchCateData(); // Refresh category data after editing
          handleEditDialogClose();
        })
        .catch((error) => {
          console.error('Error editing category:', error);
          setShowErrorAlert(true);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (id.startsWith('brand')) {
        // Deleting brand data
        const brandID = id.replace('brand', ''); // Extract brand ID
        axios
          .delete(`http://localhost:5000/brands/${brandID}`)
          .then(() => {
            setShowBrandDeleteSucessAlert(true);
            fetchBrandData(); // Refresh brand data after deletion
          })
          .catch((error) => {
            console.error('Error deleting brand:', error);
            setShowErrorAlert(true);
          });
      } else if (id.startsWith('category')) {
        // Deleting category data
        const categoryID = id.replace('category', ''); // Extract category ID
        axios
          .delete(`http://localhost:5000/categories/${categoryID}`)
          .then(() => {
            setShowDeleteCategorySucessAlert(true);
            fetchCateData(); // Refresh category data after deletion
          })
          .catch((error) => {
            console.error('Error deleting category:', error);
            setShowErrorAlert(true);
          });
      }
    }
  };

  const handleAdd = () => {
    console.log('working', addData);
    if (addData.Name) {
      if (addData.BrandID) {
        // Adding brand data
        axios
          .post(`http://localhost:5000/brands`, { Name: addData.Name })
          .then(() => {
            setShowBrandAddSucessAlert(true);
            fetchBrandData(); // Refresh brand data after addition
            setAddData({ Name: '', BrandID: false });
            handleAddDialogClose();
          })
          .catch((error) => {
            console.error('Error adding brand:', error);
            setShowErrorAlert(true);
          });
      } else if (addData.CategoryID) {
        // Adding category data
        axios
          .post(`http://localhost:5000/categories`, { Name: addData.Name })
          .then(() => {
            setShowAddCategorySucessAlert(true);
            fetchCateData(); // Refresh category data after addition
            setAddData({ Name: '', CategoryID: false });
            handleAddDialogClose();
          })
          .catch((error) => {
            console.error('Error adding category:', error);
            setShowErrorAlert(true);
          });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setShowErrorAlert(false);
    setShowAddCategorySucessAlert(false);
    setShowEditCategorySucessAlert(false);
    setShowDeleteCategorySucessAlert(false);
    setShowBrandAddSucessAlert(false);
    setShowBrandEditSucessAlert(false);
    setShowBrandDeleteSucessAlert(false);
  };

  return (
    <MainCard>
      <CustomSnackbar
        open={showAddCategorySucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Category Added Successfully!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showEditCategorySucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Category Edited!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showDeleteCategorySucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Category Deleted!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showBrandAddSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Brand Added Successfully!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showBrandEditSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Brand Edited!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showBrandDeleteSucessAlert}
        onClose={handleCloseSnackbar}
        severity="success" // Pass the severity based on your logic
        titlename="Success:"
        message="Successfully Brand Deleted!" // Pass the message based on your logic
      />
      <CustomSnackbar
        open={showErrorAlert}
        onClose={handleCloseSnackbar}
        severity="error" // Pass the severity based on your logic
        titlename="Error:"
        message="Something went wrong, Please try again!" // Pass the message based on your logic
      />
      <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
        {/* Brand Table */}
        <div style={{ flexBasis: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3>Brands</h3>
            <div style={{ gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={fetchBrandData}>
                Refresh
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={handleAddBrandDialogOpen}
                startIcon={<Add />}
              >
                Add Brand
              </Button>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brand.map((data) => (
                  <TableRow key={data.BrandID}>
                    <TableCell>{data.BrandID}</TableCell>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEditDialogOpen(data)}>
                        <Edit />
                      </Button>
                      <Button color="error" onClick={() => handleDelete(`brand${data.BrandID}`)}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Category Table */}
        <div style={{ flexBasis: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3>Categories</h3>
            <div style={{ gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={fetchCateData}>
                Refresh
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={handleAddCatergoryDialogOpen}
                startIcon={<Add />}
              >
                Add Category
              </Button>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category.map((data) => (
                  <TableRow key={data.CategoryID}>
                    <TableCell>{data.CategoryID}</TableCell>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEditDialogOpen(data)}>
                        <Edit />
                      </Button>
                      <Button color="error" onClick={() => handleDelete(`category${data.CategoryID}`)}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          {/* Add form fields here */}
          <TextField
            label="Name"
            value={editData.Name}
            onChange={(e) => setEditData({ ...editData, Name: e.target.value })}
            fullWidth
            sx={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          {/* Add form fields here */}
          <TextField
            label="Name"
            value={addData.Name}
            onChange={(e) => setAddData({ ...addData, Name: e.target.value })}
            fullWidth
            sx={{ marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default BarndAndCategory;
