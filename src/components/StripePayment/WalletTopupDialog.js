import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const AmountBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  boxShadow: theme.shadows[2],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px', // Fixed width for uniformity
  height: '200px', // Fixed height for uniformity
  margin: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));
function WalletTopupDialog({ openDialog, handleCloseDialog, onPaymentSuccess }) {

  const userInfo = useSelector((state) => state.user.userInfo);
  const [selectedAmount, setSelectedAmount] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // Define the buy button configurations
  const buyButtonConfigs = [
    { id: 'buy_btn_1QHPklCKDVYYRcHfkxVa83En', pounds: '52', credits: 60 },
    { id: 'buy_btn_1QHPklCKDVYYRcHfkxVa83Eo', pounds: '85', credits: 100 },
    { id: 'buy_btn_1QHPklCKDVYYRcHfkxVa83Ep', pounds: '800', credits: 1000 },
    { id: 'buy_btn_1QGv2hCKDVYYRcHfsZncQR29', pounds: 'Custom', credits: 'Custom' },
  ];

  // Function to handle amount selection
  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };
  const handleClose = () => {
    setSelectedAmount(null);
    handleCloseDialog();
  };
  const handlePaymentSuccess = async () => {
     setPaymentSuccess(true);
    onPaymentSuccess();
    handleClose();
     setPaymentSuccess(false); 
 
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="lg" fullWidth>
        {paymentSuccess ? (
          <>
            <DialogTitle>Verifying payment...</DialogTitle>
            <DialogContent>
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>Add More Credits</DialogTitle>
            <DialogContent>
              <Typography>Select the amount of credits:</Typography>
              <Box mt={2} display="flex" justifyContent="center"  gap={2}>
                {/* Chips for selecting the amount */}
                {buyButtonConfigs.map((config) => (
                  <AmountBox sx={{ textAlign: 'center' }} key={config.id} onClick={() => handleSelectAmount(config)}>
                    {`${config.pounds} pounds`}
                    <br />
                    {` = `}
                    <br />
                    {`${config.credits} credits`}
                  </AmountBox>
                ))}
              </Box>
              {selectedAmount && (
                <Box display="flex" justifyContent="center" mt={2} key={selectedAmount.id}>
                  <stripe-buy-button
                    buy-button-id={selectedAmount.id}
                    publishable-key="pk_test_51OrMfiCKDVYYRcHfmgkLkNKvjJab0KT3s732qyHK5bzhvazLvpqJ0zeh5qk2PO3nR1A9Sx9IjKv179xF6qVHNwJl00Qx4A4DOs"
                    client-reference-id={`${userInfo._id}_${userInfo.active_business._id}_WalletTopup`}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Box display="flex" flexDirection="row-reverse" justifyContent="space-between" width="100%" gap={2}>
                {selectedAmount && (
                  <Button onClick={handlePaymentSuccess} color="primary">
                    Payment successful ?
                  </Button>
                )}
                <Button onClick={handleClose} color="primary">
                  Topup next time
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default WalletTopupDialog;

WalletTopupDialog.propTypes = {
  openDialog: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  onPaymentSuccess: PropTypes.func,
};
