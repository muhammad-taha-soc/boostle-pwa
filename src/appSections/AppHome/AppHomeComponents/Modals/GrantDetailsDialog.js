// src/appSections/AppHome/AppHomeComponents/GrantDetailsDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Grid, Chip, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoneyIcon from '@mui/icons-material/Money';
import EventIcon from '@mui/icons-material/Event';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';
import { formatCurrency } from '../../../../utilities/helperFunctions';
import PropTypes from 'prop-types';

const GrantDetailsDialog = ({ open, handleClose, grant }) => {
  if (!grant) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
      <Typography variant="h5" color="primary" gutterBottom>
          {grant.name}
        </Typography>
        <IconButton onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom><MoneyIcon color="action" /> Funding Amounts:</Typography>
            <Chip label={`Min: ${formatCurrency(grant.min_award_amount, 'GBP')}`}  />
            <Chip label={`Max: ${formatCurrency(grant.max_award_amount, 'GBP')}`} style={{ marginLeft: 8 }} />
            <Chip label={`Total: ${formatCurrency(grant.total_award_amount, 'GBP')}`}  style={{ marginLeft: 8 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom><EventIcon color="action" /> Validity Period:</Typography>
            <Typography variant="body2">From: {new Date(grant.valid_from).toDateString()}</Typography>
            <Typography variant="body2">To: {new Date(grant.valid_to).toDateString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom><PublicIcon color="action" /> Applicant Types:</Typography>
            {grant.applicant_type.map((type, index) => (
              <Chip key={index} label={type} style={{ marginRight: 4 }} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom><BusinessIcon color="action" /> Source and Link:</Typography>
            <Typography variant="body2">{grant.source}</Typography>
            <Link href={grant.link} target="_blank" rel="noopener">View Grant Details</Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Description:</Typography>
            <Typography variant="body2">{grant.description}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default GrantDetailsDialog;

GrantDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  grant: PropTypes.object.isRequired,
};