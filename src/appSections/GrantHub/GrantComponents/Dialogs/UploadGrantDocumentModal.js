import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  IconButton,
  Button as MaterialButton,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

// Simulate fetching documents from Data Vault
const fetchDataVaultDocuments = async () => {
  return [
    {
      id: 1,
      name: 'Project Proposal',
      type: 'pdf',
      description: 'Detailed project proposal document.',
    },
    {
      id: 2,
      name: 'Budget Plan',
      type: 'excel',
      description: 'Budget plan for the project.',
    },
    {
      id: 3,
      name: 'Presentation',
      type: 'ppt',
      description: 'Project presentation slides.',
    },
    {
      id: 4,
      name: 'Project Proposal',
      type: 'pdf',
      description: 'Detailed project proposal document.',
    },
    {
      id: 5,
      name: 'Budget Plan',
      type: 'excel',
      description: 'Budget plan for the project.',
    },
    {
      id: 6,
      name: 'Presentation',
      type: 'ppt',
      description: 'Project presentation slides.',
    },
  ];
};

function UploadGrantDocument({ open, handleClose, onDocumentSelect }) {
  const [tabValue, setTabValue] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataVaultDocuments, setDataVaultDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  useEffect(() => {
    const loadDataVaultDocuments = async () => {
      const documents = await fetchDataVaultDocuments();
      setDataVaultDocuments(documents);
    };
    if (tabValue === 0) {
      loadDataVaultDocuments();
    }
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
  };
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
    }));

    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const handleDocumentSelectFromVault = (documentId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId],
    );
  };

  const handleUpload = () => {
    const newDocuments = selectedFiles.map((file, index) => ({
      id: `file-${index}`,
      name: file.name,
      type: file.type || 'unknown',
      description: 'Uploaded from computer',
    }));
    onDocumentSelect(newDocuments);
    setSelectedFiles([]);

    handleClose();
  };

  const handleSelectFromVault = () => {
    const selectedFromVault = dataVaultDocuments.filter((doc) => selectedDocuments.includes(doc.id));
    onDocumentSelect(selectedFromVault);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Upload or Select Document</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Select from Data Vault" />
          <Tab label="Upload from Computer" />
        </Tabs>

        {/* Tab Panel: Upload from Computer */}
        {tabValue === 0 && (
          // <Box sx={{ padding: 3 }}>
          //   <input type="file" multiple onChange={handleFileSelect} />
          //   {selectedFiles.length > 0 && (
          //     <Box sx={{ marginTop: 2 }}>
          //       <Typography variant="body2">Selected Files:</Typography>
          //       {selectedFiles.map((file, index) => (
          //         <Typography key={index} variant="body2">
          //           {file.name}
          //         </Typography>
          //       ))}
          //     </Box>
          //   )}
          //   <MaterialButton variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleUpload}>
          //     Upload
          //   </MaterialButton>
          // </Box>

          <Box sx={{ padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Documents Available
            </Typography>
            <Grid container spacing={2}>
              {dataVaultDocuments.map((document) => (
                <Grid item xs={12} md={6} key={document.id}>
                  <Box
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: 2,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedDocuments.includes(document.id)}
                          onChange={() => handleDocumentSelectFromVault(document.id)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {document.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            {document.type}
                          </Typography>
                          <Typography variant="body2" sx={{ marginTop: 1 }}>
                            {document.description}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <MaterialButton variant="outlined" sx={{ marginTop: 2 }} onClick={handleSelectFromVault}>
              Select Documents
            </MaterialButton>
          </Box>
        )}

        {/* Tab Panel: Select from Data Vault */}
        {tabValue === 1 && (
          <>
            <Box
              sx={{
                border: '1px dashed #ccc',
                padding: '20px',
                borderRadius: 1,
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                marginBottom: 3,
                marginTop: 3,
              }}
            >
              <input style={{ display: 'none' }} id="file-upload" type="file" multiple onChange={handleFileSelect} />
              <label htmlFor="file-upload">
                <Typography variant="body2" color="text.secondary">
                  Drag and Drop files here or{' '}
                  <Typography variant="body2" component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                    Upload from Computer
                  </Typography>
                </Typography>
              </label>
            </Box>

            {/* Display Uploaded Files */}
            {selectedFiles.length > 0 && (
              <Grid container spacing={2}>
                {selectedFiles.map((file, index) => (
                  <Grid item xs={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        image="/path/to/file-icon.png"
                        alt={file.name}
                        sx={{ width: '50px', marginTop: 1 }}
                      />
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="body2" textAlign="center" sx={{ flexGrow: 1 }}>
                          {file.name}
                        </Typography>
                        <IconButton onClick={() => handleRemoveFile(index)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <MaterialButton variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleUpload}>
              Upload
            </MaterialButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

UploadGrantDocument.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDocumentSelect: PropTypes.func.isRequired,
};

export default UploadGrantDocument;
