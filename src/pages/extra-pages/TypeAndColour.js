// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Edit, Delete, Add } from '@mui/icons-material'; // Import icons
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomSnackbar from 'components/CustomSnackbar';

const TypeAndColour = () => {
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showTypeAddSuccessAlert, setShowTypeAddSuccessAlert] = useState(false);
  const [showTypeEditSuccessAlert, setShowTypeEditSuccessAlert] = useState(false);
  const [showTypeDeleteSuccessAlert, setShowTypeDeleteSuccessAlert] = useState(false);
  const [showColorAddSuccessAlert, setShowColorAddSuccessAlert] = useState(false);
  const [showColorEditSuccessAlert, setShowColorEditSuccessAlert] = useState(false);
  const [showColorDeleteSuccessAlert, setShowColorDeleteSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editData, setEditData] = useState({});
  const [addData, setAddData] = useState({
    Name: ''
    // Add other fields as needed for new data
  });

  useEffect(() => {
    fetchTypeData();
    fetchColorData();
  }, []);

  const fetchTypeData = () => {
    axios
      .get('http://localhost:5000/types')
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
        setShowErrorAlert(true);
      });
  };

  const fetchColorData = () => {
    axios
      .get('http://localhost:5000/colours')
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching colors:', error);
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

  const handleAddTypeDialogOpen = () => {
    setAddData({ Name: '', TypeID: true });
    setOpenAddDialog(true);
  };

  const handleAddColorDialogOpen = () => {
    setAddData({ Name: '', ColourID: true });
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEdit = () => {
    if (editData.TypeID) {
      // Editing type data
      axios
        .put(`http://localhost:5000/types/${editData.TypeID}`, editData)
        .then(() => {
          setShowTypeEditSuccessAlert(true);
          fetchTypeData(); // Refresh type data after editing
          handleEditDialogClose();
        })
        .catch((error) => {
          console.error('Error editing type:', error);
          setShowErrorAlert(true);
        });
    } else if (editData.ColourID) {
      // Editing color data
      axios
        .put(`http://localhost:5000/colours/${editData.ColourID}`, editData)
        .then(() => {
          setShowColorEditSuccessAlert(true);
          fetchColorData(); // Refresh color data after editing
          handleEditDialogClose();
        })
        .catch((error) => {
          console.error('Error editing color:', error);
          setShowErrorAlert(true);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (id.startsWith('type')) {
        // Deleting type data
        const typeID = id.replace('type', ''); // Extract type ID
        axios
          .delete(`http://localhost:5000/types/${typeID}`)
          .then(() => {
            setShowTypeDeleteSuccessAlert(true);
            fetchTypeData(); // Refresh type data after deletion
          })
          .catch((error) => {
            console.error('Error deleting type:', error);
            setShowErrorAlert(true);
          });
      } else if (id.startsWith('color')) {
        // Deleting color data
        const colourID = id.replace('color', ''); // Extract color ID
        axios
          .delete(`http://localhost:5000/colours/${colourID}`)
          .then(() => {
            setShowColorDeleteSuccessAlert(true);
            fetchColorData(); // Refresh color data after deletion
          })
          .catch((error) => {
            console.error('Error deleting color:', error);
            setShowErrorAlert(true);
          });
      }
    }
  };

  const handleAdd = () => {
    if (addData.Name) {
      if (addData.TypeID) {
        // Adding type data
        axios
          .post(`http://localhost:5000/types`, { Name: addData.Name })
          .then(() => {
            setShowTypeAddSuccessAlert(true);
            fetchTypeData(); // Refresh type data after addition
            setAddData({ Name: '', TypeID: false });
            handleAddDialogClose();
          })
          .catch((error) => {
            console.error('Error adding type:', error);
            setShowErrorAlert(true);
          });
      } else if (addData.ColourID) {
        // Adding color data
        axios
          .post(`http://localhost:5000/colours`, { Name: addData.Name })
          .then(() => {
            setShowColorAddSuccessAlert(true);
            fetchColorData(); // Refresh color data after addition
            setAddData({ Name: '', ColorID: false });
            handleAddDialogClose();
          })
          .catch((error) => {
            console.error('Error adding color:', error);
            setShowErrorAlert(true);
          });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setShowErrorAlert(false);
    setShowColorAddSuccessAlert(false);
    setShowColorEditSuccessAlert(false);
    setShowColorDeleteSuccessAlert(false);
    setShowTypeAddSuccessAlert(false);
    setShowTypeEditSuccessAlert(false);
    setShowTypeDeleteSuccessAlert(false);
  };

  return (
    <MainCard>
      <CustomSnackbar
        open={showTypeAddSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Type Added Successfully!"
      />
      <CustomSnackbar
        open={showTypeEditSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Successfully Type Edited!"
      />
      <CustomSnackbar
        open={showTypeDeleteSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Successfully Type Deleted!"
      />
      <CustomSnackbar
        open={showColorAddSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Color Added Successfully!"
      />
      <CustomSnackbar
        open={showColorEditSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Successfully Color Edited!"
      />
      <CustomSnackbar
        open={showColorDeleteSuccessAlert}
        onClose={handleCloseSnackbar}
        severity="success"
        titlename="Success:"
        message="Successfully Color Deleted!"
      />
      <CustomSnackbar
        open={showErrorAlert}
        onClose={handleCloseSnackbar}
        severity="error"
        titlename="Error:"
        message="Something went wrong, Please try again!"
      />
      <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
        <div style={{ flexBasis: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3>Types</h3>
            <div style={{ gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={fetchTypeData}>
                Refresh
              </Button>
              <Button variant="contained" color="primary" sx={{ marginLeft: '10px' }} onClick={handleAddTypeDialogOpen} startIcon={<Add />}>
                Add Type
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
                {types.map((data) => (
                  <TableRow key={data.TypeID}>
                    <TableCell>{data.TypeID}</TableCell>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEditDialogOpen(data)}>
                        <Edit />
                      </Button>
                      <Button color="error" onClick={() => handleDelete(`type${data.TypeID}`)}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ flexBasis: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3>Colors</h3>
            <div style={{ gap: '10px' }}>
              <Button variant="contained" color="warning" onClick={fetchColorData}>
                Refresh
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={handleAddColorDialogOpen}
                startIcon={<Add />}
              >
                Add Color
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
                {colors.map((data) => (
                  <TableRow key={data.ColourID}>
                    <TableCell>{data.ColourID}</TableCell>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEditDialogOpen(data)}>
                        <Edit />
                      </Button>
                      <Button color="error" onClick={() => handleDelete(`color${data.ColourID}`)}>
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
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
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
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
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

export default TypeAndColour;
