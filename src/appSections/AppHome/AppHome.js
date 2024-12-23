/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReduxGrantsList } from '../../redux/actions/setReduxGrantsList';
import { setReduxApplicationsList } from '../../redux/actions/setReduxApplicationsList';
import autoAnimate from '@formkit/auto-animate';
import _ from 'lodash';
import ProtectedLayout from '../../layouts/protectedLayout';
import MaterialButton from '../../components/Button/MaterialButton';
import { findSectors, adjustDeadline } from '../../utilities/helperFunctions';
import { dialogContents, HomeStepsContent } from '../../utilities/content';
import { useNavigate } from 'react-router-dom';
import workflowimg1 from '../../assets/images/Dashboardimages/14.svg';
import workflowimg2 from '../../assets/images/Dashboardimages/15.svg';
import workflowimg3 from '../../assets/images/Dashboardimages/16.svg';
import workflowimg4 from '../../assets/images/Dashboardimages/17.svg';
import { getAllGrantResults, updateUserFirstUse, getAllApplicationResults } from '../../utilities/apiCalls';
import Joyride from 'react-joyride';
import { STATUS } from 'react-joyride';
import { XLg } from 'react-bootstrap-icons';
import GrantCard from './AppHomeComponents/GrantCard';
import Notification from './AppHomeComponents/Notification';
import BoxImage1 from '../../assets/images/Dashboardimages/Object Email UI (5) (2).png';
import BoxImage2 from '../../assets/images/Dashboardimages/Object Email UI (7) (3).png';
import BoxImage3 from '../../assets/images/Dashboardimages/Object Email UI (4) (2).png';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import InProgressGrants from './AppHomeComponents/InProgressGrants';
import SubmittedGrants from './AppHomeComponents/SubmittedGrants';
import ReadytoStartGrants from './AppHomeComponents/ReadytoStartGrants';
import NewGrantModal from './AppHomeComponents/Modals/NewGrantModal';
import AddExternalLinkModal from './AppHomeComponents/Modals/AddExternalLinkModal';
import { Grid, Box, Typography, List, ListItem } from '@mui/material';
import './AppHome.scss';
import { setUserInformation } from '../../redux/actions/setUserInformation';
import InfoDialog from './AppHomeComponents/Modals/InfoDialog';
import { WavingHandTwoTone } from '@mui/icons-material';
function AppHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const businessInfo = useSelector((state) => state.business.businessInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const grantsListInStore = useSelector((state) => state.grants.grantsList);
  const businessSector = !_.isEmpty(businessInfo) && businessInfo.sector ? findSectors(businessInfo.sector[0]) : '';
  const parentRef = useRef();
  const [grantsList, setGrantsList] = useState([]);
  const [readyToStartGrants, setReadyToStartGrants] = useState([]);
  const [applicationsList, setApplicationsList] = useState([]);
  const [newGrantsCount, setNewGrantsCount] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  let refresh = true;
  const [open, setOpen] = useState(false);
  const [openlink, setOpenLink] = useState(false);
  const [grantLink, setGrantLink] = useState('');
  const [openModalNewGrant, setOpenModalNewGrant] = useState(false);

  const [inProgressApplications, setInProgressApplications] = useState([]);
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [run, setRun] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', text: [] });
  const [steps, setSteps] = useState(HomeStepsContent);

  const handleOpenDialog = (type) => {
    setDialogContent(dialogContents[type]);
    setDialogOpen(true);
  };
  const handleOpenModalNewGrant = () => {
    setOpenModalNewGrant(true); // This will open the modxal when the card is clicked
  };

  const handleCloseModalNewGrant = () => {
    setOpenModalNewGrant(false); // This will close the modal
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setGrantLink('');
  };
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
      const updatedUserInfo = { ...userInfo, first_use: false }; // Update the first_use field
      dispatch(setUserInformation(updatedUserInfo)); // Dispatch the updated userInfo
      illustrationComplete({ first_use: false });
    }
  };
  const illustrationComplete = async (payload) => {
    const result = await updateUserFirstUse(payload);
    console.log('result', result);
  };
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  useEffect(() => {
    // if (refresh || (grantsListInStore && grantsListInStore.length === 0)) {
    //   fetchAllGrantsList();
    //   refresh = false;
    //   fetchAllApplicationsList();
    //   if (userInfo.first_use) {
    //     setRun(true);
    //   }
    //   // fetchAllApplicationsList();
    // } else {
    //   setGrantsList(grantsListInStore);
    // }
    fetchAllGrantsList();
    fetchAllApplicationsList();
    if (userInfo.first_use) {
      setRun(true);
    }
  }, []);

  const fetchAllGrantsList = async () => {
    if (!businessInfo || !businessInfo._id) {
      console.error('Business information is not available yet.');
      setTimeout(fetchAllGrantsList, 3000);
      return; // Exit the function if businessInfo or businessInfo._id is not available
    }
    const payload = {
      business: businessInfo._id,
    };
    console.log(`userInfo`, userInfo);
    // if (firstLoad) {
    //   payload.refresh = true;
    //   setFirstLoad(false);
    // }
    try {
      // if (!_.isEmpty(businessInfo)) {
      const result = await getAllGrantResults(payload);
      console.log(`grants`, result);

      // Adjust deadlines for all grants
      const grantsList = result.result.grants.map((g) => {
        g.status = 'not applied'; // Ensure the status is set to 'not applied'
        return adjustDeadline(g); // Adjust deadline and flag if necessary
      });
      const newGrantList = result.result.newGrants.map((g) => {
        g.status = 'not applied';
        g.new = true;
        return adjustDeadline(g); // Adjust deadline and flag if necessary
      });
      console.log(grantsList);
      // const subscriptionResponse = await getSubscriptionStatus();
      // console.log('subscriptionResponse',subscriptionResponse);
      const fullgrantList = [...newGrantList, ...grantsList];

      setGrantsList(fullgrantList);
      setNewGrantsCount(result.result.count || 0);
      dispatch(setReduxGrantsList(fullgrantList));

      setApplicationsList(result.result.applications);
      dispatch(setReduxApplicationsList(result.result.applications));
    } catch (error) {
      console.error('fetch grants call failed as no business info', error);
    }
  };

  const fetchAllApplicationsList = async () => {
    const payload = {};
    try {
      const result = await getAllApplicationResults(payload);
      const applicationsList = result.result.map((g) => {
        return g;
      });
      setApplicationsList(applicationsList);
      dispatch(setReduxApplicationsList(applicationsList));
      // setReadyToStartGrants(applicationsList.filter((a) => a.status === 'not_started'));
      const notStartedApplications = applicationsList.filter((a) => a.status === 'not_started');
      setReadyToStartGrants(notStartedApplications);
      console.log(`not applications list`, notStartedApplications);
      const inProgressApplications = applicationsList.filter((a) => a.status === 'in_progress');
      setInProgressApplications(inProgressApplications);

      const submittedApplications = applicationsList.filter((a) => a.status === 'submitted');
      setSubmittedApplications(submittedApplications);
      console.log(`in progress applications list`, inProgressApplications);
    } catch (error) {
      console.error('fetch applications call failed', error);
    }
  };

  return (
    <>
      <Joyride
        continuous
        run={run}
        steps={steps}
        callback={handleJoyrideCallback}
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: '#404040',
          },
        }}
      />
      <ProtectedLayout isPublic={false} className="">
        <DndProvider backend={HTML5Backend}>
          <Grid container>
            {/* Title and Description */}
            <Grid item xs={12} md={12} className="welcome-message">
              <Box
                sx={{
                  paddingTop: { xs: 2, md: 3 },
                  textAlign: { xs: 'center', md: 'left' },
                  fontFamily: 'Poppins',
                }}
              >
                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: { xs: '15px', md: '40px' }, 
                    margin: 0,
                    position: 'relative',
                    display: 'inline-block',
                    textDecoration: 'underline', // First underline
                    textDecorationColor: '#FF6347', // Color of the first underline
                    '&:after': { // Creating a pseudo-element for the second underline
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: '-2px', // Adjust this value based on your font size and spacing needs
                      width: '100%',
                      height: '3px', // Thickness of the second underline
                      backgroundColor: '#00BFFF', // Color of the second underline
                    }
                  }}
                >
                  Welcome
                 
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    fontSize: { xs: '14px', md: '16px' },
                    marginTop: { xs: 2, md: 1 },
                  }}
                >
                  The Grant Hub is your gateway to new opportunities. Explore new grants tailored to you and track your
                  progress as you unlock growth!
                </Typography>
              </Box>
            </Grid>

            {/* Three Boxes */}
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} sx={{ marginTop: 3 }}>
                {/* Box 1 */}
                <Grid item xs={12} md={4}>
                  <Box
                    onClick={handleOpenModalNewGrant}
                    className="grants-for-you"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 2,
                      flexDirection: 'column',

                      justifyContent: 'center',
                      cursor: 'pointer',

                      // Updated border
                      borderRadius: '12px', // Updated border-radius
                      background: 'var(--White, #FFF)', // Updated background
                      // Updated box-shadow
                      position: 'relative', // To position the notification bubble
                    }}
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={BoxImage1}
                      alt="Your Grants"
                      sx={{ width: 125, height: 125, marginRight: 2 }}
                    />

                    {/* Text Content */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--Text-dark, #404040)', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: 'Poppins', // Font family
                          fontSize: '20px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 600, // Font weight
                          lineHeight: '28px', // Line height
                          letterSpacing: '0.5px', // Letter spacing
                        }}
                      >
                        Grants for You
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: ' var(--Outline, #79747E);', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: 'Poppins', // Font family
                          fontSize: '12px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 400, // Font weight
                          lineHeight: '16px', // Line height
                          letterSpacing: '0.4px', // Letter spacing
                        }}
                      >
                        The latest grant opportunities tailored to your business
                      </Typography>
                    </Box>

                    {/* Notification Bubble */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      {newGrantsCount}
                    </Box>
                  </Box>
                </Grid>

                <NewGrantModal
                  openModalNewGrant={openModalNewGrant}
                  handleCloseModalNewGrant={handleCloseModalNewGrant}
                  grantsList={grantsList}
                  fetchAllApplicationsList={fetchAllApplicationsList}
                  count={newGrantsCount}
                  // readyToStartGrants={readyToStartGrants}
                  // setReadyToStartGrants={setReadyToStartGrants}
                />
                {/* Box 2 */}
                <Grid item xs={12} md={4}>
                  <Box
                    onClick={handleClickOpen} // Opens the modal on click
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      alignItems: 'center',
                      padding: 2,
                      minHeight: '200px',
                      // Updated border
                      borderRadius: '12px', // Updated border-radius
                      background: 'var(--White, #FFF)', // Updated background
                      // Updated box-shadow
                      position: 'relative', // To position the notification bubble
                      cursor: 'pointer', // Add pointer to show clickable behavior
                    }}
                    className="add-grant-button"
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={BoxImage2}
                      alt="Completed Grants"
                      sx={{ width: 125, height: 125, marginRight: 2 }}
                    />

                    {/* Text Content */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--Text-dark, #404040)', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: 'Poppins', // Font family
                          fontSize: '20px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 600, // Font weight
                          lineHeight: '28px', // Line height
                          letterSpacing: '0.5px', // Letter spacing
                        }}
                      >
                        Add a Grant
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'var(--Outline, #79747E);', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: 'Poppins', // Font family
                          fontSize: '11px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 400, // Font weight
                          lineHeight: '16px', // Line height
                          letterSpacing: '0.4px', // Letter spacing
                        }}
                      >
                        Found a grant outside our platform? Just drop the link
                      </Typography>
                    </Box>

                    {/* Notification Bubble */}
                  </Box>
                </Grid>
                {/* The Modal */}
                <AddExternalLinkModal open={open} setOpen={setOpen} />
                {/* Box 3 */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      alignItems: 'center',
                      padding: 2,
                      // Updated border
                      borderRadius: '12px', // Updated border-radius
                      background: 'var(--White, #FFF)', // Updated background
                      // Updated box-shadow
                      position: 'relative',

                      opacity: 0.5, // Reduce opacity to grey out
                    }}
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={BoxImage3}
                      alt="Reported Grants"
                      sx={{ width: 125, height: 125, marginRight: 2 }}
                    />

                    {/* Text Content */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--Text-dark, #404040)', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: '"League Spartan"', // Font family
                          fontSize: '20px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 600, // Font weight
                          lineHeight: '28px', // Line height
                          letterSpacing: '0.5px', // Letter spacing
                        }}
                      >
                        Add Documents
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: ' var(--Outline, #79747E);', // Custom color
                          textAlign: 'center', // Text alignment
                          fontFamily: '"Playfair Display"', // Font family
                          fontSize: '11px', // Font size
                          fontStyle: 'normal', // Font style
                          fontWeight: 400, // Font weight
                          lineHeight: '16px', // Line height
                          letterSpacing: '0.4px', // Letter spacing
                        }}
                      >
                        Add any document to use in your applications.
                      </Typography>
                    </Box>

                    {/* "Coming Soon" Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      Coming Soon
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} md={8} sx={{ marginBottom: '10px' }}>
                    <Notification />
                  </Grid> */}
            </Grid>
          </Grid>

          {/* Title */}

          {/* Title and Description Section */}
          <Grid container sx={{ marginTop: 4 }} className="track-your-applications">
            {/* Title */}
            <Grid item xs={12} md={6} sx={{ marginBottom: '10px' }}>
              <Typography
                variant="h4"
                sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '15px', md: '40px' }, margin: 0 }}
              >
                Track your Applications
              </Typography>
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  fontSize: { xs: '14px', md: '16px' },
                  marginTop: { xs: 2, md: 0 },
                }}
              >
                You can simply drag and drop to update the status of your application, or select a grant to find out
                more details.
              </Typography>
            </Grid>
          </Grid>

          {/* Card Section */}
          <Grid container spacing={2} sx={{ paddingTop: 3 }}>
            {/* Box 1 */}
            <Grid item xs={12} sm={6} md={4} className="ready-to-start">
              <ReadytoStartGrants
                readyToStartGrants={readyToStartGrants}
                setReadyToStartGrants={setReadyToStartGrants}
                handleOpenModalNewGrant={handleOpenModalNewGrant}
              />
            </Grid>

            {/* Box 2 */}
            <Grid item xs={12} sm={6} md={4} className="in-progress">
              <InProgressGrants grantsList={inProgressApplications} setGrantsList={setInProgressApplications} />
            </Grid>

            {/* Box 3 */}
            <Grid item xs={12} sm={6} md={4} className="submitted">
              <SubmittedGrants grantsList={submittedApplications} setGrantsList={setSubmittedApplications} />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={6} sx={{ marginBottom: '10px' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '20px', md: '50px' }, margin: 0 }}>
                How It Works
              </Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="body1" sx={{ fontSize: { xs: '14px', md: '16px' }, marginTop: { xs: 2, md: 0 } }}>
                Check out our workflows and how to improve your work
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid item xs={12} md={3} sx={{ marginBottom: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  flexDirection: 'column',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  cursor: 'pointer',
                  // Updated border
                  borderRadius: '12px', // Updated border-radius
                  background: 'var(--White, #FFF)', // Updated background

                  position: 'relative', // To position the notification bubble
                }}
              >
                {/* Image */}

                {/* Text Content */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--Text-dark, #404040)', // Custom color
                      textAlign: 'center', // Text alignment

                      fontSize: '18px', // Font size
                      fontStyle: 'normal',
                      fontFamily: 'Poppins',
                      fontWeight: 600, // Font weight
                      lineHeight: '24px', // Line height
                      letterSpacing: '0.5px', // Letter spacing
                    }}
                  >
                    Write Perfect Applications
                  </Typography>
                  <Box
                    component="img"
                    src={workflowimg3}
                    alt="Your Grants"
                    sx={{ width: 125, height: 125, marginRight: 2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: ' var(--Outline, #79747E);', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '11px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 400, // Font weight
                      lineHeight: '16px', // Line height
                      letterSpacing: '0.4px', // Letter spacing
                    }}
                  >
                    Tips for success from our professional grant writers
                  </Typography>
                </Box>

                {/* Notification Bubble */}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ marginBottom: '10px' }}>
              <Box
                onClick={() => handleOpenDialog('credits')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  flexDirection: 'column',
                  textAlign: 'center',
                  cursor: 'pointer',
                  // Updated border
                  borderRadius: '12px', // Updated border-radius
                  background: 'var(--White, #FFF)', // Updated background
                  // Updated box-shadow
                  position: 'relative', // To position the notification bubble
                }}
              >
                {/* Image */}

                {/* Text Content */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--Text-dark, #404040)', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '18px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 600, // Font weight
                      lineHeight: '24px', // Line height
                      letterSpacing: '0.5px', // Letter spacing
                    }}
                  >
                    How do Ailsa credits work?
                  </Typography>
                  <Box
                    component="img"
                    src={workflowimg4}
                    alt="Your Grants"
                    sx={{ width: 125, height: 125, marginRight: 2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: ' var(--Outline, #79747E);', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '11px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 400, // Font weight
                      lineHeight: '16px', // Line height
                      letterSpacing: '0.4px', // Letter spacing
                    }}
                  >
                    Learn how Ailsa credits work and how we price grant applications
                  </Typography>
                </Box>

                {/* Notification Bubble */}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ marginBottom: '10px' }}>
              <Box
                onClick={() => handleOpenDialog('firstEleven')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  flexDirection: 'column',
                  textAlign: 'center',
                  cursor: 'pointer',
                  // Updated border
                  borderRadius: '12px', // Updated border-radius
                  background: 'var(--White, #FFF)', // Updated background
                  // Updated box-shadow
                  position: 'relative', // To position the notification bubble
                }}
              >
                {/* Image */}

                {/* Text Content */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--Text-dark, #404040)', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '18px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 600, // Font weight
                      lineHeight: '24px', // Line height
                      letterSpacing: '0.5px', // Letter spacing
                    }}
                  >
                    Enter Ailsa first 11
                  </Typography>
                  <Box
                    component="img"
                    src={workflowimg2}
                    alt="Your Grants"
                    sx={{ width: 125, height: 125, marginRight: 2 }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: ' var(--Outline, #79747E);', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '11px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 400, // Font weight
                      lineHeight: '16px', // Line height
                      letterSpacing: '0.4px', // Letter spacing
                    }}
                  >
                    Increase your chance of getting a grant and win 500 Ailsa credits
                  </Typography>
                </Box>

                {/* Notification Bubble */}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ marginBottom: '10px' }}>
              <Box
                onClick={() => handleOpenDialog('collective')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  flexDirection: 'column',
                  textAlign: 'center',
                  cursor: 'pointer',
                  // Updated border
                  borderRadius: '12px', // Updated border-radius
                  background: 'var(--White, #FFF)', // Updated background
                  // Updated box-shadow
                  position: 'relative', // To position the notification bubble
                }}
              >
                {/* Image */}

                {/* Text Content */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--Text-dark, #404040)', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '18px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 600, // Font weight
                      lineHeight: '24px', // Line height
                      letterSpacing: '0.5px', // Letter spacing
                    }}
                  >
                    Join the Ailsa Collective
                  </Typography>
                  <Box
                    component="img"
                    src={workflowimg1}
                    alt="Your Grants"
                    sx={{ width: 125, height: 125, marginRight: 2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: ' var(--Outline, #79747E);', // Custom color
                      textAlign: 'center', // Text alignment
                      fontFamily: 'Poppins',
                      fontSize: '11px', // Font size
                      fontStyle: 'normal', // Font style
                      fontWeight: 400, // Font weight
                      lineHeight: '16px', // Line height
                      letterSpacing: '0.4px', // Letter spacing
                    }}
                  >
                    Help us empower SMBs and earn Ailsa credits
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <InfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} content={dialogContent} />
          </Grid>
        </DndProvider>
      </ProtectedLayout>
    </>
  );
}

export default AppHome;
