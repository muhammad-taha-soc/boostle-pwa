/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  List,
  Alert,
  CircularProgress,
  ListItem,
} from '@mui/material';
import MaterialButton from '../../../../components/Button/MaterialButton';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import Thumbup from '../../../../assets/images/Dashboardimages/Vector_up.png';
// import Thumbdown from '../../../../assets/images/Dashboardimages/Vector.png';
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { initializeApplication, addNotInterestedGrants } from '../../../../utilities/apiCalls';
import { getDaysRemainingWithFiveDaysSubtracted } from '../../../../utilities/helperFunctions';
import { formatCurrency } from '../../../../utilities/helperFunctions';
import { styled, keyframes } from '@mui/material/styles';
import GrantDetailsDialog from './GrantDetailsDialog';
import ConfirmationDialog from './ConfirmationDialog';
// Define a styled component for the deadline tag
const DeadlineTag = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '4px 8px',
  backgroundColor: '#000',
  color: 'white',
  borderRadius: '0 0 0 8px',
}));
const TokensRequiredTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '4px 8px',
  backgroundColor: 'gold',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '12px',
  zIndex: 1,
  borderRadius: '10px',
  background:
    'linear-gradient(90deg, #8f87df 0%, #8f87df 50%, #8f87df 100%) gold',
  backgroundSize: '200% auto',
  animation: `${shineAnimation} 2s linear infinite`,
}));

const shineAnimation = keyframes`
  0% { background-position: 0px; }
  25% { background-position: 25px; }
  50% { background-position: 50px; }
  75% { background-position: 75px; }
  100% { background-position: 100px; }
   
`;

function NewGrantModal({ openModalNewGrant, handleCloseModalNewGrant, grantsList, fetchAllApplicationsList, count }) {
  const navigate = useNavigate();

  const [filteredGrants, setFilteredGrants] = useState(grantsList);
  const [fetchingApplication, setFetchingApplication] = useState(false);
  const [grantAdded, setGrantAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [addGrantConfirmationOpen, setAddGrantConfirmationOpen] = useState(false);
  const [currentGrant, setCurrentGrant] = useState(null);
  const [notInterestedGrantAdded, setNotInterestedGrantAdded] = useState(false);
  const handleCloseAddGrantConfirmation = () => {
    setAddGrantConfirmationOpen(false);
  };
  const handleCloseNotInterestedGrantAdded = () => {
    setNotInterestedGrantAdded(false);
  };
  const handleOpenDetails = (grant) => {
    setSelectedGrant(grant);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  useEffect(() => {
    setFilteredGrants(grantsList);
  }, [grantsList]);
  const sortGrantsByDeadline = () => {
    const sortedGrants = [...filteredGrants].sort((a, b) => {
      const dateA = parseISO(a.valid_to);
      const dateB = parseISO(b.valid_to);
      return dateA - dateB;
    });
    setFilteredGrants(sortedGrants);
  };
  const sortGrantsByName = () => {
    const sortedGrants = [...filteredGrants].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setFilteredGrants(sortedGrants);
  };
  const sortByBudget = () => {
    const sortedGrants = [...filteredGrants].sort((a, b) => {
      return a.max_award_amount - b.max_award_amount;
    });
    setFilteredGrants(sortedGrants);
  };

  const addToReadyToStart = async (grant) => {
    handleCloseAddGrantConfirmation();
    setFetchingApplication(true);
    const payload = {
      grant_id: grant._id,
    };
    const result = await initializeApplication(payload);
    console.log(result);
    //setReadyToStartGrants([...readyToStartGrants, grant]);
    fetchAllApplicationsList();
    removeFromGrantsList(grant);
    setFetchingApplication(false);
    setGrantAdded(true);
    setTimeout(() => setGrantAdded(false), 3000);
    
  };
  const removeFromGrantsList = (grant) => {
    const newGrantsList = filteredGrants.filter((g) => g._id !== grant._id);
    setFilteredGrants(newGrantsList);
  };
  const addNotInterestedGrant = async (grant) => {
    console.log(grant._id);
    const payload = {
      grant_id: grant._id,
    };
    const result = await addNotInterestedGrants(payload);
    console.log(result);    
    console.log(`not interested grant added: ${result}`);
    handleCloseNotInterestedGrantAdded();
    removeFromGrantsList(grant);
  };

  return (
    <>
      <Dialog
        open={openModalNewGrant}
        onClose={handleCloseModalNewGrant}
        fullWidth
        maxWidth="lg"
        sx={{ backdropFilter: 'blur(4px)' }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Nice! We&apos;ve found {count} grants - check them out!
          </Typography>
          <IconButton onClick={handleCloseModalNewGrant}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Filters Section */}
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item>
              <MaterialButton variant="outlined" onClick={sortGrantsByName}>
                Sort by Name
              </MaterialButton>
            </Grid>
            <Grid item>
              <MaterialButton variant="outlined" onClick={sortByBudget}>
                Sort by Budget
              </MaterialButton>
            </Grid>
            <Grid item>
              <MaterialButton variant="outlined" onClick={sortGrantsByDeadline}>
                Sort by Deadline
              </MaterialButton>
            </Grid>
          </Grid>

          {/* List of New Grants */}
          {fetchingApplication ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <LoadingSpinner loading={fetchingApplication} size="xxxl" />
            </Box>
          ) : (
            <Box sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 2 }}>
              {grantAdded ? <Alert severity="success">Grant added to your applications!</Alert> : null}
              <List>
                {filteredGrants.length > 0 ? (
                  filteredGrants.map((grant, index) => (
                    <>
                      <ListItem
                        key={index}
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'row',
                          
                          padding: '10px 0',
                        }}
                      >
                        <TokensRequiredTag>{grant.cost} Credits Required</TokensRequiredTag>
                        {/* Grant Details */}
                        <Box
                          sx={{
                            backgroundColor: '#fff',
                            padding: 2,
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          {getDaysRemainingWithFiveDaysSubtracted(grant.valid_to) === 0 ? (
                            <DeadlineTag> Last day to apply.</DeadlineTag>
                          ) : getDaysRemainingWithFiveDaysSubtracted(grant.valid_to) < 10 ? (
                            <DeadlineTag>
                              {' '}
                              Hurry! Only {getDaysRemainingWithFiveDaysSubtracted(grant.valid_to)} day
                              {getDaysRemainingWithFiveDaysSubtracted(grant.valid_to) === 1 ? '' : 's'} to apply.
                            </DeadlineTag>
                          ) : null}
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                display: '-webkit-box',
                              
                                fontSize: '14px',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                fontFamily: 'Poppins',
                                fontWeight: '700',
                              }}
                            >
                              {grant.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                fontSize: '12px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                              }}
                            >
                              {grant.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: '12px', marginTop: '8px', fontFamily: 'Poppins', fontWeight: '400' }}
                            >
                              {' '}
                              Hurry! Only {getDaysRemainingWithFiveDaysSubtracted(grant.valid_to)} day
                              {getDaysRemainingWithFiveDaysSubtracted(grant.valid_to) === 1 ? '' : 's'} to apply.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              justifyContent: 'start',
                              alignItems: 'center',
                              padding: 1,

                              whiteSpace: 'nowrap',
                              fontFamily: 'Poppins',
                              fontWeight: '400',
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              color="#8f87df"
                              sx={{
                               
                                fontFamily: 'Poppins',
                                fontWeight: '600',
                               
                                marginTop: '4px',
                              }}
                            >
                              Maximum Award
                            </Typography>
                            <Typography variant="subtitle2" color="textPrimary" sx={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600' }}>
                              {formatCurrency(grant.max_award_amount, 'GBP')}
                            </Typography>

                            {/* <Typography variant="body2" color="text.secondary" sx={{ fontSize: '8px' }}>
                        <Icon
                          style={{
                            marginRight: '4px',
                          }}
                          icon="ph:check-bold"
                          color="#000"
                          width={12}
                          height={12}
                        />
                        AI Startups Considered
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '8px' }}>
                        <Icon
                          style={{
                            marginRight: '4px',
                          }}
                          icon="ph:check-bold"
                          color="#000"
                          width={12}
                          height={12}
                        />
                        Great Budget
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '8px' }}>
                        <Icon
                          style={{
                            marginRight: '4px',
                          }}
                          icon="ph:check-bold"
                          color="#000"
                          width={12}
                          height={12}
                        />
                        Easy to Apply
                      </Typography> */}
                          </Box>

                          {/* Action Buttons */}

                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              margin: 1,
                            }}
                          >
                            {/* <Tooltip title="Show Details">
                          <IconButton color="primary" onClick={() => navigate(`/grantdetails/${grant.id}`)}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Archive">
                          <IconButton color="primary" onClick={() => handleAction(grant, 'archived')}>
                            <ThumbDownIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add to Queue">
                          <IconButton color="primary" onClick={() => handleAction(grant, 'liked')}>
                            <ThumbUpIcon />
                          </IconButton>
                        </Tooltip> */}

                            <Box
                              sx={{
                                borderRadius: '12px',
                                backgroundColor: '#fff',
                                ':hover': {
                                  transform: 'scale(1.1)',
                                },
                                width: '64px',
                                height: '64px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onClick={() => {
                                setCurrentGrant(grant);
                                setNotInterestedGrantAdded(true);
                              }}
                            >
                              <Tooltip title=" Not Interested ">
                                <ThumbDownOutlined />
                              </Tooltip>
                            </Box>
                            <Box
                              sx={{
                                borderRadius: '12px',
                                backgroundColor: '#fff',
                                ':hover': {
                                  transform: 'scale(1.1)',
                                },
                                cursor: 'pointer',
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                justifyContent: 'center',

                                alignItems: 'center',
                              }}
                              onClick={() => {
                                setCurrentGrant(grant);
                                setAddGrantConfirmationOpen(true);
                              }}
                            >
                              <Tooltip title="Interested">
                                <ThumbUpOutlined />
                              </Tooltip>
                            </Box>
                            <Tooltip title="Show Details">
                              <IconButton onClick={() => handleOpenDetails(grant)}>
                                <InfoOutlined />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </ListItem>
                    </>
                  ))
                ) : count === 0 ? (
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6">No grants found</Typography>
                  </div>
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
                    <CircularProgress
                      variant="indeterminate"
                      size={50}
                      label="Loading"
                      thickness={2}
                      sx={{
                        margin: '0 auto', // Optional: Additional horizontal centering
                      }}
                    />
                    <Typography variant="body2">Loading grants...</Typography>
                  </div>
                )}
              </List>
            </Box>
          )}

          {/* Footer Section */}
          {/* <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Didn&apos;t find the grant you were looking for? Tell us more to help you.
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
            Search for Grants
          </Button>
        </Box> */}
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={notInterestedGrantAdded}
        handleClose={handleCloseNotInterestedGrantAdded}
        onConfirm={() => addNotInterestedGrant(currentGrant)}
        title="Add to Not Interested Grants"
        message="Are you sure you are not interested in this grant?"
      />
      <ConfirmationDialog
        open={addGrantConfirmationOpen}
        handleClose={handleCloseAddGrantConfirmation}
        onConfirm={() => addToReadyToStart(currentGrant)}
        title="Add to Ready to Start Grants"
        message="Are you sure you want to add this grant to your ready to start grants?"
      />
      <GrantDetailsDialog open={detailsOpen} handleClose={handleCloseDetails} grant={selectedGrant} />
    </>
  );
}

export default NewGrantModal;

NewGrantModal.propTypes = {
  openModalNewGrant: PropTypes.bool.isRequired,
  handleCloseModalNewGrant: PropTypes.func.isRequired,
  grantsList: PropTypes.array.isRequired,
  fetchAllApplicationsList: PropTypes.func.isRequired,
  count: PropTypes.number,
};
