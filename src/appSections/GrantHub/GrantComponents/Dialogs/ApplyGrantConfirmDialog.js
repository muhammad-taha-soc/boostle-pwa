import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WalletTopupDialog from '../../../../components/StripePayment/WalletTopupDialog';
import PropTypes from 'prop-types';
import MaterialButton from '../../../../components/Button/MaterialButton';

function ApplyGrantConfirmDialog({ open, handleClose, grantDetails, handleApplyForGrant }) {
  const businessInfo = useSelector((state) => state.business.businessInfo);
  const [balanceError, setBalanceError] = useState(false);
  const [openTopupDialog, setOpenTopupDialog] = useState(false);
  useEffect(() => {
    if (grantDetails.cost > businessInfo.balance) {
      setBalanceError(true);
    }
  }, [balanceError]);
  const handleTopup = () => {
    setOpenTopupDialog(true);
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {balanceError ? (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Insufficient funds
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You currently have {businessInfo.balance} credits available.To proceed with this grant application,
                please add more credits to your balance.
              </DialogContentText>
              <DialogActions>
                <MaterialButton variant="outlined" onClick={handleClose}>
                  Cancel
                </MaterialButton>
                <MaterialButton variant="contained" onClick={handleTopup}>
                  Top-up
                </MaterialButton>
              </DialogActions>
            </DialogContent>
            <WalletTopupDialog openDialog={openTopupDialog} handleCloseDialog={() => setOpenTopupDialog(false)} />
          </>
        ) : (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Are you sure you want to apply for this grant?
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>This will cost you {grantDetails.cost} credits.</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <MaterialButton variant="outlined" size="large" onClick={handleClose}>
                Cancel
              </MaterialButton>
              <MaterialButton variant="contained" size="large" onClick={() => handleApplyForGrant()}>
                Apply
              </MaterialButton>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

ApplyGrantConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  grantDetails: PropTypes.object.isRequired,
  handleApplyForGrant: PropTypes.func.isRequired,
};

export default ApplyGrantConfirmDialog;
