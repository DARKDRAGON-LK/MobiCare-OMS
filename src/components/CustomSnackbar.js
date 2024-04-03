import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const CustomSnackbar = ({ open, onClose, severity, titlename, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }} variant="filled">
        <Typography variant="body1">
          <strong>{titlename}</strong>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
