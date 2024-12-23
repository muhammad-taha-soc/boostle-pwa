/* eslint-disable react/prop-types */
import React from 'react';
import { useDrop } from 'react-dnd';
import GrantCard from './GrantCard';
import { List, ListItem, Typography } from '@mui/material';
import { submitApplication } from '../../../utilities/apiCalls';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
const DroppableArea = ({ grantsList, setGrantsList }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [status, setStatus] = useState(null);

  const checkAllAnswersFilled = (grant) => {
    return (
      grant.responses &&
      grant.responses.content &&
      grant.responses.content.sections &&
      grant.responses.content.sections.every((section) =>
        section.questions.every(
          (question) => !question.mandatory || (question.answer != null && question.answer !== '')
        )
      )
    );
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCompleteApplication = (applicationId, status) => {
    navigate(`/grantdetails/${applicationId}/${status}`);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'GRANT',
    canDrop: (item) => {
      // Only allow items with status "in_progress" to be dropped here
      return item.grant.status === 'in_progress';
    },
    drop: (item) => {
      setApplicationId(item.grant._id);
      setStatus(item.grant.status);

      if (checkAllAnswersFilled(item.grant)) {
        item.grant.status = 'submitted';
        setGrantsList((prev) => [...prev, item.grant]);

        submitApplication({ application_id: item.grant._id })
          .then((response) => {
            console.log('Success:', response);
          })
          .catch((error) => {
            console.error('Error submitting application:', error.response || error);
          });

        item.removeFromList(item.index); // Remove from the source list
      } else {
        setOpenDialog(true);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <>
      <List
        ref={drop}
        sx={{
          overflowY: 'auto',
          flexGrow: 1,
          backgroundColor: isOver
            ? canDrop
              ? '#e0f7fa' // Highlight when a valid drop is possible
              : '#ffcdd2' // Invalid drop attempt
            : 'white',
        }}
      >
        {grantsList.length > 0 ? (
          grantsList.map((grant, index) => (
            <ListItem key={index} disablePadding>
              <GrantCard
                progress={100}
                grantTitle={grant.grant.name}
                deadline={grant.grant.valid_to}
                applicationid={grant._id}
                status={grant.status}
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
              No reported grants yet.
            </Typography>
          </div>
        )}
      </List>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{'Incomplete Application'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Not all mandatory questions have been answered. Please complete the application.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={() => handleCompleteApplication(applicationId, status)} color="primary">
            Complete Application
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DroppableArea;
