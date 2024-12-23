
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
function ApplicationSubmittedModal({ open, handleClose }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Application Submitted</DialogTitle>
      <DialogContent>Your application has been submitted successfully
      <DialogActions>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
export default ApplicationSubmittedModal;
ApplicationSubmittedModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
