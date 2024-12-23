/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Tabs, Tab, Alert } from '@mui/material';
import ProtectedLayout from '../../layouts/protectedLayout';
import questionData from './GrantComponents/question.json';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency, getApplicationStartDate, adjustDeadline } from '../../utilities/helperFunctions';
import { Link } from 'react-router-dom';
import RenderQuestionForm from './GrantComponents/renderQuestionForm';
import {
  ArrowBack,
  CalendarToday,
  EventAvailable,
  EventBusy,
  LocationOn,
  Money,
  SourceRounded,
} from '@mui/icons-material';
import { getApplicationDetails, applyForGrant } from '../../utilities/apiCalls';
import MaterialButton from '../../components/Button/MaterialButton';
import LockIcon from '@mui/icons-material/Lock';
import UploadGrantDocument from './GrantComponents/Dialogs/UploadGrantDocumentModal';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Skeleton } from '@mui/material';
import ApplyGrantConfirmDialog from './GrantComponents/Dialogs/ApplyGrantConfirmDialog';
import ApplicationstagesDialog from './GrantComponents/Dialogs/ApplicationstagesDialog';
import Grantobjectwithapplicationcontent from './GrantComponents/Grantobjectwithapplicationcontent.json';
const GrantDetails = () => {
  const { applicationid, status } = useParams();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [grantDetails, setGrantDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openApplyGrantConfirmDialog, setOpenApplyGrantConfirmDialog] = useState(false);
  const [openApplicationStagesDialog, setOpenApplicationStagesDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [applyResponse, setApplyResponse] = useState(null);
  const [applicationContent, setApplicationContent] = useState({});
  const [grantApplication, setGrantApplication] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationStatus]);

  const fetchApplicationDetails = async () => {
    setIsLoading(true);
    const payload = {
      application_id: applicationid,
    };
    const response = await getApplicationDetails(payload);
    console.log('response', response.result[0]);
    setApplicationStatus(response.result[0].status);
    setGrantApplication(response.result[0]);
    if (response.result[0].responses) {
      setApplicationContent(response.result[0].responses);
      console.log('applicationContent', applicationContent);
    }
    if (response.result[0].status === 'in_progress') {
      setOpenApplicationStagesDialog(true);
    }
    const adjustedGrantDetails = adjustDeadline(response.result[0].grant);
    setGrantDetails(adjustedGrantDetails);
    console.log('Application details response:', response);
    setIsLoading(false);
  };
  const handleApplyForGrant = async () => {
    console.log('apply for grant');

    const payload = {
      application_id: applicationid,
    };
    applyForGrant(payload) // Assuming applyForGrant is an API call function you need to define or import
      .then((response) => {
        setApplyResponse(response);
        console.log('Apply response:', response);
        setApplicationStatus(response.result.application.status);
        const adjustedGrantDetails = adjustDeadline(response.result.application.grant);

        setGrantDetails(adjustedGrantDetails);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error applying for grant:', error.response || error);
        setIsLoading(false); // Stop loading
      });
    handleCloseApplyGrantConfirmDialog();
    //  if(Grantobjectwithapplicationcontent.application_content){
    //   setApplicationContent(Grantobjectwithapplicationcontent.application_content);
    //   setOpenApplicationStagesDialog(true);

    //  }
    // const payload = {
    //   application_id: applicationid,
    // };
    // const response = await applyForGrant(payload);
    // console.log('response', response);
  };
  const handleCloseApplyGrantConfirmDialog = () => {
    setOpenApplyGrantConfirmDialog(false);
  };

  // Skeleton placeholders
  const renderSkeleton = () => (
    <Box sx={{ padding: 2 }}>
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rectangular" width="100%" height={118} />
    </Box>
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // Callback function to update attached documents when selected from the dialog
  const handleDocumentSelect = (newDocuments) => {
    setAttachedDocuments((prevDocuments) => {
      // Filter out any documents that already exist in the attached list
      const uniqueDocuments = newDocuments.filter((newDoc) => !prevDocuments.some((doc) => doc.id === newDoc.id));
      return [...prevDocuments, ...uniqueDocuments];
    });
  };
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setOpenQuestionDialog(true);
  };

  const handleQuestionDialogClose = () => {
    setOpenQuestionDialog(false);
    setSelectedQuestion(null);
  };

  return (
    <ProtectedLayout isPublic={false}>
      <Grid item xs={12} md={12}>
        {/* {status === 'not_started' && applyResponse && (
          <Alert severity="info">
            we are working on it to generate answers for you. Come back later and check your application in the progress
            section.
          </Alert>
        )} */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: { xs: 2, md: 3 },
            marginBottom: { xs: 2, md: 3 },
          }}
        >
          <Link to="/home">
            <Button
              variant="text"
              sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}
              startIcon={<ArrowBack />}
              onClick={() => {
                /* Add navigation logic here */
              }}
            >
              Back to Dashboard
            </Button>
          </Link>

          {/* Other Buttons */}
          {/* <Box sx={{}}>
              <Button variant="outlined" startIcon={<Share />} sx={{ marginRight: 1 }}>
                Share
              </Button>
              <Button variant="outlined" startIcon={<PictureAsPdf />} sx={{ marginRight: 1 }}>
                Export PDF
              </Button>
              <Button variant="outlined" startIcon={<Archive />}>
                Archive
              </Button>
            </Box> */}

          {applicationStatus === 'not_started' && (
            <MaterialButton
              onClick={() => setOpenApplyGrantConfirmDialog(true)}
              variant="contained"
              size="large"
              sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}
            >
              Start Application
            </MaterialButton>
          )}
        </Box>
      </Grid>
      {/* Title and Description */}
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            paddingTop: { xs: 2, md: 3 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Title */}
          {isLoading ? (
            renderSkeleton()
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ fontFamily: 'Poppins', fontWeight: '800', fontSize: { xs: '20px', md: '50px' }, margin: 0 }}
              >
                {grantDetails.name}
              </Typography>

              {/* Description */}
              <Typography
                variant="h4"
                sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: { xs: '10px', md: '30px' }, mt: 2 }}
              >
                <SourceRounded fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                {grantDetails.funder}
              </Typography>
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: '#fff',
            borderRadius: 10,
            borderTopLeftRadius: 5,
            borderBottomRightRadius: 5,
            padding: 2,
          }}
        >
          <Box sx={{ flexGrow: 1, marginRight: { md: 2 } }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="grant details tabs">
              <Tab
                sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}
                label="Summary"
              />
              <Tab
                sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}
                label="Eligibility"
              />
              <Tab
                sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}
                label="Additional Information  "
              />
            </Tabs>
            <Box sx={{ padding: 2 }}>
              {tabValue === 0 && (
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '20px' } }}>
                  {/* Summary content */}
                  {grantDetails.description}
                </Typography>
              )}
              {tabValue === 1 && (
                <Box sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '20px' } }}>
                  {/* Eligibility content */}
                  {grantDetails.additional_data && grantDetails.additional_data.eligibility_criteria.length > 0 ? (
                    grantDetails.additional_data.eligibility_criteria.map((criterion, index) => (
                      <Typography key={index} variant="body1" sx={{ mt: 1 }}>
                        {criterion}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      No eligibility criteria available.
                    </Typography>
                  )}
                </Box>
              )}
              {tabValue === 2 && (
                <Box sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '20px' } }}>
                  {/* Objectives content */}
                  {grantDetails.additional_data && grantDetails.additional_data.unique_features.length > 0 ? (
                    grantDetails.additional_data.unique_features.map((objective, index) => (
                      <Typography key={index} variant="body1" sx={{ mt: 1 }}>
                        {objective}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      No objectives available.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              minWidth: '270px',
              minHeight: '400px',
              padding: 2,
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* <Typography variant="h6">Grant Information</Typography> */}
            {isLoading ? (
              renderSkeleton()
            ) : (
              <>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}>
                  <EventAvailable sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Opening Date: {getApplicationStartDate(grantDetails.valid_from)}
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}>
                  <EventBusy sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Closing Date: {getApplicationStartDate(grantDetails.valid_to)}
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}>
                  <LocationOn sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Location: UK
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '10px', md: '15px' } }}>
                  <Money sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Budget: {formatCurrency(grantDetails.max_award_amount, 'GBP')}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            paddingTop: { xs: 2, md: 3 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            sx={{ fontFamily: 'Poppins', fontWeight: '800', fontSize: { xs: '20px', md: '50px' }, margin: 0 }}
          >
            Application Questions and Documents
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '400',
              fontSize: { xs: '14px', md: '20px' },
              marginTop: { xs: 2, md: 1 },
            }}
          >
            Here you can manage your documents, attach more and complete the required questionaire.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',

            backgroundColor: '#fff',
            padding: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '30px' }, marginBottom: 2 }}
          >
            Questionnaire and Tasks
          </Typography>
          {applicationStatus === 'not_started' && (
            <>
              <Box
                sx={{
                  padding: 2,
                  filter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <LockIcon fontSize="large" />
              </Box>
              <Typography variant="body1" sx={{ marginTop: 2, textAlign: 'center', filter: 'blur(1px)' }}>
                Start Application to begin
              </Typography>
            </>
          )}
          {applicationStatus === 'in_progress' && (
            <Box sx={{ padding: 2 }}>
              {(grantDetails.application_content && grantDetails.application_content.content) ||
              applicationContent?.content ? (
                <RenderQuestionForm
                  sections={
                    applicationContent?.content?.sections
                      ? applicationContent.content.sections
                      : grantDetails.application_content.content.sections
                  }
                  applicationId={applicationid}
                />
              ) : (
                <Typography variant="body1" sx={{ marginTop: 2, textAlign: 'center' }}>
                  We are working on your application. Please check back later.
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <ApplyGrantConfirmDialog
          grantDetails={grantDetails}
          open={openApplyGrantConfirmDialog}
          handleClose={handleCloseApplyGrantConfirmDialog}
          handleApplyForGrant={handleApplyForGrant}
        />
        <ApplicationstagesDialog
          open={openApplicationStagesDialog}
          handleClose={() => setOpenApplicationStagesDialog(false)}
          grantapplication={grantApplication}
        />
      </Grid>
      {/* <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              width: '100%',
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Documents Attached
            </Typography>

          
            <Box
              sx={{
                maxHeight: '400px', // Adjust the height based on the size of each ListItem to fit around 6 items
                overflowY: 'auto',
                padding: 1,
              }}
            >
              <List>
                {attachedDocuments.map((document) => (
                  <ListItem
                    key={document.id}
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      marginBottom: 1,
                      padding: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{document.name.charAt(0).toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={document.name} secondary={`${document.type} - ${document.description}`} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <MaterialButton onClick={handleOpenDialog} variant="outlined" size="medium" startIcon={<Add />}>
              Add Document
            </MaterialButton>
            <UploadGrantDocument
              open={openDialog}
              handleClose={handleCloseDialog}
              onDocumentSelect={handleDocumentSelect}
            />
          </Box>
        </Grid> */}
      {/* <GrantQuestionAnswerModal
          open={openQuestionDialog}
          question={selectedQuestion}
          documents={attachedDocuments}
          handleClose={handleQuestionDialogClose}
        /> */}
    </ProtectedLayout>
  );
};

export default GrantDetails;
