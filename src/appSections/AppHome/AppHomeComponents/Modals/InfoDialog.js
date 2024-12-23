import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
function InfoDialog({ open, onClose, content }) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              {content.text.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText sx={{ fontSize: '14px', fontFamily: 'Poppins' }} primary={item} />
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoDialog;

InfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
};
