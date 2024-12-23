/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import DraggableGrantCard from './DraggableGrantCard';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { applyForGrant } from '../../../utilities/apiCalls';
import ApplyGrantConfirmDialog from '../../GrantHub/GrantComponents/Dialogs/ApplyGrantConfirmDialog';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ConfirmationDialog from './Modals/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
const InProgressGrants = ({ grantsList, setGrantsList }) => {
  const navigate = useNavigate();
  const [openApplyGrantConfirmDialog, setOpenApplyGrantConfirmDialog] = useState(false);
  const [grantDetails, setGrantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: 'GRANT',
    drop: (item) => {
      // Add the grant to the InProgress list
      
      // setGrantDetails(item.grant);
      // setOpenApplyGrantConfirmDialog(true);
      setGrantsList((prev) => [...prev, item.grant]);
      // Remove the grant from its source list
      item.removeFromList();
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };
  const handleConfirmationDialogConfirm = () => {
    setOpenConfirmationDialog(false);
    navigate(`/grantdetails/${grantDetails._id}`);
  };
  const handleApplyForGrant = async () => {
    setIsLoading(true);
    const payload = {
      application_id: grantDetails._id,
    };
    applyForGrant(payload) // Assuming applyForGrant is an API call function you need to define or import
      .then((response) => {
        console.log('Apply response:', response);
        setGrantDetails(response.result.application.grant);
        setOpenApplyGrantConfirmDialog(false); // Close the apply dialog
        setOpenConfirmationDialog(true); // Show the application started dialog // Add to InProgress
      })
      .catch((error) => {
        console.error('Error applying for grant:', error.response || error);
        setIsLoading(false);
      });
  };
  const handleCloseApplyGrantConfirmDialog = () => {
    setOpenApplyGrantConfirmDialog(false);
    setGrantDetails(null);
  };

  return (
    <>
      <Box
        ref={drop}
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: isOver ? '#e0f7fa' : '#fff',
        marginBottom: 4,
        height: { xs: 'auto', md: '500px' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'Poppins', fontWeight: '700' }}>
        In Progress
      </Typography>
      <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {grantsList.length > 0 ? (
          grantsList.map((grant, index) => (
            <ListItem disablePadding key={index}>
              <DraggableGrantCard
                grant={grant}
                index={index}
                removeFromList={() => setGrantsList((prev) => prev.filter((_, i) => i !== index))}
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
              No in progress grants available.
            </Typography>
          </div>
        )}
      </List>
      </Box>
      {grantDetails && (  
        <ApplyGrantConfirmDialog
          grantDetails={grantDetails}
        open={openApplyGrantConfirmDialog}
          handleClose={handleCloseApplyGrantConfirmDialog}
          handleApplyForGrant={handleApplyForGrant}
        />
      )}
      {isLoading && <LoadingSpinner />}
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmationDialogConfirm}
        title="Thank you for applying for this grant"
        message="Application started successfully"
        YesLabeled="View Details"
        NoLabeled="Cancel"
      />
    </>
  );
};

export default InProgressGrants;

InProgressGrants.propTypes = {
  grantsList: PropTypes.array.isRequired,
  setGrantsList: PropTypes.func.isRequired,
};
