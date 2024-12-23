import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
function ConfirmationDialog({open, handleClose, onConfirm, title, message,YesLabeled,NoLabeled}) {
  return (
    <Dialog open={open} onClose={handleClose}fullWidth
    maxWidth="md"
    sx={{ backdropFilter: 'blur(4px)' }}
    PaperProps={{
      sx: {
        borderRadius: '12px',
      },
    }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{NoLabeled?NoLabeled:'No'}</Button>
        <Button onClick={onConfirm}>{YesLabeled?YesLabeled:'Yes'}  </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  YesLabeled: PropTypes.string,
  NoLabeled: PropTypes.string,
};
