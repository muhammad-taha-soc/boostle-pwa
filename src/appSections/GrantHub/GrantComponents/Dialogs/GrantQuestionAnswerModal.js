import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Checkbox,
} from '@mui/material';
import PropTypes from 'prop-types';

const GrantQuestionAnswerModal = ({ open, question, handleClose, documents }) => {
  const [answer, setAnswer] = useState('');
  const [aiSetting, setAiSetting] = useState('');
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAiSettingChange = (event) => {
    setAiSetting(event.target.value);
  };

  const handleDocSelection = (event) => {
    const docId = event.target.name;
    const isChecked = event.target.checked;
    setSelectedDocs((prev) => {
      if (isChecked) {
        return [...prev, docId];
      } else {
        return prev.filter((id) => id !== docId);
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>{question ? `Question ${question.id}` : 'No Question Selected'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {question ? (
            <>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {question.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {question.body}
                </Typography>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                  Due date: {question.dueDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <TextField
                  label="Write your answer here or let AI generate answer"
                  placeholder="Write your answer here or let AI generate answer"
                  multiline
                  rows={15}
                  variant="outlined"
                  fullWidth
                  value={answer}
                  onChange={handleAnswerChange}
                  helperText={`${answer.length}/5000 words`}
                />

                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="ai-setting-label">AI Settings</InputLabel>
                    <Select
                      labelId="ai-setting-label"
                      value={aiSetting}
                      label="AI Settings"
                      onChange={handleAiSettingChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Reference from these documents
                  </Typography>
                  {documents ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        maxHeight: '300px', // Set a fixed height that can show approximately 5 items
                        overflowY: 'auto', // Make it scrollable
                      }}
                    >
                      {documents.map((doc) => (
                        <Box key={doc.id} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox
                            checked={selectedDocs.includes(doc.id)}
                            onChange={handleDocSelection}
                            name={doc.id}
                          />
                          <Typography variant="body1">{doc.name}</Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body1">No documents found.</Typography>
                  )}
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="body1">No question selected.</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Button onClick={handleClose} color="primary">
            Dismiss Changes
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Save Answer
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

GrantQuestionAnswerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
};

export default GrantQuestionAnswerModal;
