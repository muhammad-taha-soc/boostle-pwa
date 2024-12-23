import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import DraggableGrantCard from './DraggableGrantCard';
import MaterialButton from '../../../components/Button/MaterialButton';
import PropTypes from 'prop-types';

function ReadytoStartGrants({ readyToStartGrants, setReadyToStartGrants, handleOpenModalNewGrant }) {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        marginBottom: 4,
        backgroundColor: '#fff',
        height: { xs: 'auto', md: '500px' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: '700' }}>
        Ready to Start
      </Typography>
      <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {readyToStartGrants.length > 0 ? (
          readyToStartGrants.map((grant, index) => (
            <ListItem disablePadding key={index}>
              <DraggableGrantCard
                grant={grant}
                index={index}
                removeFromList={() => setReadyToStartGrants((prev) => prev.filter((_, i) => i !== index))}
              />
            </ListItem>
          ))
        ) : (
          <div
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
              No applications to start
            </Typography>
          </div>
        )}
      </List>
      <MaterialButton variant="contained" size="medium" onClick={handleOpenModalNewGrant}>
        Explore more new grants
      </MaterialButton>
    </Box>
  );
}

ReadytoStartGrants.propTypes = {
  readyToStartGrants: PropTypes.array.isRequired,
  setReadyToStartGrants: PropTypes.func.isRequired,
  handleOpenModalNewGrant: PropTypes.func.isRequired,
};

export default ReadytoStartGrants;
