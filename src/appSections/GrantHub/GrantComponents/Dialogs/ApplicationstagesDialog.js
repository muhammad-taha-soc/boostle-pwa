import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  // CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
function ApplicationstagesDialog({ open, handleClose, grantapplication }) {
  const [activeStep, setActiveStep] = useState(0);
  // Check if there is any content in the application_content sections
  const hasContent =
    grantapplication.grant &&
    grantapplication.grant.application_content

  // Check if all sections in responses have at least one non-null response
  const hasAnswers =
  grantapplication.responses &&
  grantapplication.responses.content &&
  grantapplication.responses.content.sections &&
  grantapplication.responses.content.sections.every((section) =>
    section.questions.every((question) =>
      !question.mandatory || (question.answer != null && question.answer !== '')
    ),
  );

  const steps = [
    {
      label: 'Retrieving Application Questions',
      description: 'Gathering relevant questions for this grant.',
      message: 'We will email you when your Application Questions are ready',
      completed: hasContent,
    },
    {
      label: 'Generating Responses',
      description: 'Generating answers based on your business details.',
      message: 'We will email you when your Application Answers are ready',
      completed: hasAnswers,
    },
    {
      label: 'Finalizing Application',
      description: 'Preparing your application for submission.',
      message: 'We will email you when your Application is ready',
      completed: hasContent && hasAnswers,
    },
  ];

  useEffect(() => {
    let timer;
    if (activeStep < steps.length && steps[activeStep].completed) {
      timer = setTimeout(() => setActiveStep((prev) => prev + 1), 3000); // Simulate 3 seconds per step
    }
    console.log('grantapplication', grantapplication);
    console.log('hasContent', hasContent);
    console.log('hasAnswers', hasAnswers);
    return () => clearTimeout(timer);
  }, [activeStep, steps]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Application Stages</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index} completed={step.completed}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {activeStep < steps.length ? (
              <>
                <Typography variant="h6">{steps[activeStep].description}</Typography>
                <Box sx={{ mt: 1 }}>
                  {steps[activeStep].completed ? (
                    <LoadingSpinner loading={true} size="xxxl" />
                  ) : (
                    <Typography variant="h6">{steps[activeStep].message}</Typography>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" color="success.main">
                  Application Ready! 🎉
                </Typography>
                <Button onClick={() => handleClose()} variant="contained" sx={{ mt: 2 }}>
                  Show Details
                </Button>
              </>
            )}
          </Box>
        </Box>
        <DialogActions>{activeStep < steps.length && <Button onClick={handleClose}>Close</Button>}</DialogActions>
      </DialogContent>
    </Dialog>
  );
}

ApplicationstagesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  grantapplication: PropTypes.object.isRequired,
};

export default ApplicationstagesDialog;
