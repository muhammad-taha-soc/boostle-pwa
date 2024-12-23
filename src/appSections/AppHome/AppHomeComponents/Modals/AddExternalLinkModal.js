import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { addExternalGrant } from '../../../../utilities/apiCalls';
import { useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
function AddExternalLinkModal({ open, setOpen }) {
  const [grantLink, setGrantLink] = useState('');
  const [openlink, setOpenlink] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleopenlink = () => {
    setOpenlink(true);
    handleClose();
  };
  const handlecloselink = () => {
    setGrantLink('');
    setOpenlink(false);
  };

  const handleaddlink = async () => {
    if (!grantLink.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    handleopenlink();
    setLoading(true);

    setTimeout(async () => {
      const payload = {
        url: grantLink,
      };
      const result = await addExternalGrant(payload);
      console.log(result);

      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            padding: '20px',
            borderRadius: '12px', // Adjust size as per the design
            backdropFilter: 'blur(4px)', // For blurring the background
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>
          <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
            Link to Grant
          </Typography>
        </DialogTitle>

        <DialogContent>
          {/* Description */}
          <Typography variant="body2" sx={{ marginBottom: 3, textAlign: 'left' }}>
            Did you find a grant outside of our platform? Drop the link below to manage your grant on Ailsa.
          </Typography>

          {/* TextField with Cancel Icon */}
          <TextField
            label="Link to Grant"
            placeholder="please add your link to Grant"
            fullWidth
            value={grantLink}
            onChange={(e) => {
              setGrantLink(e.target.value);
              if (error) setError('');
            }}
            error={!!error}
            helperText={error}
            slotProps={{
              input: {
                endAdornment: grantLink ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setGrantLink('')} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              marginBottom: 3,
            }}
          />

          {/* Search Grant Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', // Centers the button horizontally
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleaddlink}
              sx={{
                textTransform: 'none',
                padding: '10px 20px',
                backgroundColor: '#8F87DF',
                width: '100%',
                fontSize: '16px',

                borderRadius: '20px',
              }}
            >
              Search Grant
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openlink}
        onClose={handlecloselink}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            padding: '20px',
            borderRadius: '12px', // Adjust size as per the design
            backdropFilter: 'blur(4px)', // For blurring the background
          },
        }}
      >
        <>
          <IconButton
            onClick={handlecloselink}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              {loading ? 'Adding Grant...' : 'Great Job! Grant was added successfully!'}
            </Typography>
          </DialogTitle>

          <DialogContent>
            {/* Description */}
            {loading ? (
              <LoadingSpinner loading={loading} size="xxxl" />
            ) : (
              <>
                <Typography variant="body2" sx={{ marginBottom: 3, textAlign: 'center' }}>
                  We are updating our systems every 24h. Come back a bit later to find your grant in the dashboard.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlecloselink}
                  sx={{
                    textTransform: 'none',
                    padding: '10px 20px',
                    backgroundColor: '#8F87DF',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '20px',
                  }}
                >
                  Back to Dashboard
                </Button>
              </>
            )}
          </DialogContent>
        </>
      </Dialog>
    </>
  );
}

export default AddExternalLinkModal;
AddExternalLinkModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
