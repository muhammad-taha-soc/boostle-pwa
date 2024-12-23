/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Typography } from '@mui/material';
import DroppableArea from './DroppableArea';
const ListWrapperStyle = {
  padding: 2,
  borderRadius: 2,
  backgroundColor: '#fff',
  marginBottom: 4,
  height: { xs: 'auto', md: '500px' }, // Responsive height adjustment
  display: 'flex',
  flexDirection: 'column',
  width: '100%', // Ensure full width in grid layout
};
const SubmittedGrants = ({ grantsList, setGrantsList }) => {
  return (
    <Box sx={ListWrapperStyle}>
      <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'Poppins', fontWeight: '700' }}>
        Submitted
      </Typography>
      <DroppableArea grantsList={grantsList} setGrantsList={setGrantsList} />
    </Box>
  );
};

export default SubmittedGrants;
