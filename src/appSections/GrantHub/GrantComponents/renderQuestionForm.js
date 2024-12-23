import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ApplicationSubmittedModal from '../../AppHome/AppHomeComponents/Modals/ApplicationSubmittedModal';
import { styled } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmationDialog from '../../../appSections/AppHome/AppHomeComponents/Modals/ConfirmationDialog';
// eslint-disable-next-line no-unused-vars
import { applicationUpdateResponses, submitApplication } from '../../../utilities/apiCalls';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
// eslint-disable-next-line no-unused-vars
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  transition: 'background-color 0.9s ease',
  '&.Mui-expanded': {},
}));

const RenderQuestionForm = ({ sections, applicationId }) => {
  // eslint-disable-next-line no-unused-vars
  const [completedSections, setCompletedSections] = useState(new Array(sections.length).fill(false));
  const [answers, setAnswers] = useState({});
  const [changes, setChanges] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSubmittedModal, setOpenSubmittedModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [allSectionsComplete, setAllSectionsComplete] = useState(false);
  useEffect(() => {
    // ... existing code for setting initial answers ...
    checkAllSectionsComplete();
  }, [sections, answers]);
  const checkAllSectionsComplete = () => {
    const allComplete = sections.every((section, sectionIndex) => isSectionComplete(sectionIndex));
    setAllSectionsComplete(allComplete);
  };

  useEffect(() => {
    const initialAnswers = {};
    sections.forEach((section, sIndex) => {
      section.questions.forEach((question, qIndex) => {
        const key = `${sIndex}-${qIndex}`;
        initialAnswers[key] = question.answer;
      });
    });
    setAnswers(initialAnswers);
  }, [sections]);

  const handleInputChange = (sectionIndex, questionIndex, oldValue, e) => {
    const newValue = e.target.value;
    const key = `${sectionIndex}-${questionIndex}`;
    const updatedAnswers = { ...answers, [key]: newValue };
    setAnswers(updatedAnswers);

    if (oldValue !== newValue) {
      const updatedChanges = {
        ...changes,
        [key]: {
          oldValue,
          newValue,
          questionText: sections[sectionIndex].questions[questionIndex].text,
          sectionName: sections[sectionIndex].section,
        },
      };
      setChanges(updatedChanges);
    }
  };
  const handleSubmit = async () => {
    setOpenConfirmationDialog(false);
    const response = await submitApplication({ application_id: applicationId });
    console.log(response);
    if (response.status === 'success') {
      setOpenSubmittedModal(true);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    console.log(changes);
    // eslint-disable-next-line no-unused-vars
    const updates = Object.entries(changes).map(([key, change]) => ({
      question: change.questionText,
      answer: change.newValue,
    }));

    const payload = {
      application_id: applicationId, // Ensure this is correctly passed to the component
      updates: updates,
    };
    const response = await applicationUpdateResponses(payload);
    console.log(response);
    setLoading(false);
    setShowUpdateMessage(true);
    setChanges({});
    //applicationUpdateResponses(payload);
  };

  const handleCloseDialog = () => {
    setShowUpdateMessage(false);
    setOpenDialog(false);
  };
  const isSectionComplete = (sectionIndex) => {
    return sections[sectionIndex].questions.every((question, qIndex) => {
      const key = `${sectionIndex}-${qIndex}`;
      return !question.mandatory || (question.mandatory && answers[key]);
    });
  };
  return (
    <>
      {sections.map((section, index) => (
        <StyledAccordion key={index}>
          <AccordionSummary
            expandIcon={isSectionComplete(index) ? <CheckCircleIcon color="success" /> : <ExpandMoreIcon />}
            aria-controls={`panel1a-content-${index}`}
            id={`panel1a-header-${index}`}
          >
            <Typography variant="h6">
              {section.section}
              {!isSectionComplete(index) && (
                <Typography color="error" component="span">
                  {' '}
                  - Attention Needed
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.questions.map((question, qIndex) => {
              const key = `${index}-${qIndex}`;
              return (
                <Box key={qIndex} sx={{ margin: '10px 0', fontFamily: 'montserrat' }}>
                  <Typography>
                    {question.type !== 'select' && question.text}
                    {question.mandatory && ' *'}
                  </Typography>
                  {question.type === 'select' ? (
                    <FormControl fullWidth>
                      <InputLabel id={`select-label-${key}`}>{question.text}</InputLabel>
                      <Select
                        labelId={`select-label-${key}`}
                        id={`select-${key}`}
                        value={answers[key] !== undefined ? answers[key] : question.answer}
                        label={question.text}
                        onChange={(e) => handleInputChange(index, qIndex, question.answer, e)}
                        error={question.mandatory && !answers[key]}
                      >
                        {Object.entries(question.options).map(([optionKey, optionValue]) => (
                          <MenuItem key={optionKey} value={optionValue}>
                            {optionValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      sx={{
                        fontFamily: 'montserrat',
                        ...(question.mandatory && !answers[key] && { borderColor: 'red' }),
                      }}
                      fullWidth
                      variant="outlined"
                      type={question.type === 'text' ? 'text' : question.type}
                      multiline={question.type === 'textarea'}
                      rows={question.type === 'textarea' ? 4 : 1}
                      value={
                        question.type === 'file'
                          ? undefined
                          : answers[key] !== undefined
                            ? answers[key]
                            : question.answer
                      }
                      required={question.mandatory}
                      onChange={(e) => handleInputChange(index, qIndex, question.answer, e)}
                      error={question.mandatory && !answers[key]}
                    />
                  )}
                </Box>
              );
            })}
          </AccordionDetails>
        </StyledAccordion>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Save All Changes
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!allSectionsComplete}
          sx={{ mt: 2 }}
          onClick={() => setOpenConfirmationDialog(true)}
        >
          Submit Application
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          {loading && <LoadingSpinner loading={loading} size="xxxl" />}
          {showUpdateMessage && <Typography>Data Updated Successfully!</Typography>}
          {Object.keys(changes).length === 0 ? (
            <Typography>No changes done.</Typography>
          ) : (
            <List>
              {Object.entries(changes).map(([key, { oldValue, newValue, questionText, sectionName }]) => (
                <ListItem key={key} sx={{ transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                  <Card variant="outlined" sx={{ width: '100%', p: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <ListItemText
                      primary={`Change in "${sectionName}" section, question "${questionText}":`}
                      secondary={
                        <Typography
                          component="span"
                          sx={{ display: 'block', color: 'text.secondary' }}
                        >{`${oldValue} -> ${newValue}`}</Typography>
                      }
                    />
                  </Card>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={Object.keys(changes).length === 0 || showUpdateMessage}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleSubmit}
        title="Confirm Submission"
        message="Are you sure you want to submit your application?"
      />
      <ApplicationSubmittedModal open={openSubmittedModal} handleClose={() => setOpenSubmittedModal(false)} />
    </>
  );
};

export default RenderQuestionForm;
RenderQuestionForm.propTypes = {
  sections: PropTypes.array.isRequired,
  applicationId: PropTypes.string.isRequired,
};
