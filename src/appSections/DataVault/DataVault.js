import React, { useState } from 'react';
import ProtectedLayout from '../../layouts/protectedLayout';
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

function DataVault() {
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedToVault, setUploadedToVault] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle file upload from computer
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // Handle removing a file
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(updatedFiles);
  };

  // Simulate uploading files to the document vault
  const handleUploadToVault = () => {
    setIsUploading(true);
    setOpen(false); 
    // Simulate a 2 second delay for uploading
    setTimeout(() => {
      setUploadedToVault([...uploadedToVault, ...uploadedFiles]); // Add uploaded files to the vault
      setUploadedFiles([]); // Clear the temporary uploaded files
      setIsUploading(false); // Hide the progress bar
      // Close the modal
    }, 2000);
  };

  return (
    <ProtectedLayout isPublic={false}>
        <Grid
        container
        spacing={2}
        sx={{
          margin: '0 auto',
          paddingTop: 2,
          width: '100%',
          marginBottom:'20px'
        }}
      >
        {/* Title and Description */}
        <Grid container xs={12} md={6}>
          <Grid item>
            <Box
              sx={{
                paddingTop: { xs: 2, md: 3 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '20px', md: '50px' }, margin: 0 }}>
                Data Vault
              </Typography>

              <Typography variant="body1" sx={{ fontSize: { xs: '14px', md: '16px' }, marginTop: { xs: 2, md: 1 } }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Upload button section */}
        <Grid container md={12}>
          <Grid item md={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'end',
                gap: '20px',
                padding: 2,
                textAlign: 'right',
                border: '1px solid var(--primary-Purple, #8F87DF)',
                borderRadius: '12px',
                background: 'var(--White, #FFF)',
                boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'none',
                  padding: '10px 20px',
                  backgroundColor: '#8F87DF',
                }}
              >
                Create Folder
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'none',
                  padding: '10px 20px',
                  backgroundColor: '#8F87DF',
                }}
                onClick={handleOpen}
              >
                Upload Documents
              </Button>
            </Box>
          </Grid>

          {/* File Upload Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Upload a Document
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="body2" sx={{ marginBottom: 3 }}>
                Upload documents in support of your application
              </Typography>

              {/* File Upload Area */}
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  padding: '20px',
                  borderRadius: 1,
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  marginBottom: 3,
                }}
              >
                <input style={{ display: 'none' }} id="file-upload" type="file" multiple onChange={handleFileUpload} />
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
              {uploadedFiles.length > 0 && (
                <Grid container spacing={2}>
                  {uploadedFiles.map((file, index) => (
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
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ borderRadius: 50, paddingX: 4 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadToVault}
                disabled={uploadedFiles.length === 0}
                sx={{ borderRadius: 50, paddingX: 4 }}
              >
                Upload to Document Vault
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* Show Progress Bar during uploading */}
        {isUploading && (
          <Grid item xs={12} sx={{ padding: 2 }}>
            <LinearProgress />
          </Grid>
        )}

        {/* Display Uploaded Files in Main Area */}
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          {uploadedToVault.length > 0 &&
            uploadedToVault.map((file, index) => (
              <Grid item xs={4} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image="/path/to/file-icon.png"
                    alt={file.name}
                    sx={{ width: '50px', marginTop: 1 }}
                  />
                  <CardContent>
                    <Typography variant="body2" textAlign="center">
                      {file.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </ProtectedLayout>
  );
}

export default DataVault;
