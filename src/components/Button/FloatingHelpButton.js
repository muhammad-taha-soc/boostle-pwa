import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Fab,
  Accordion,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FloatingHelpButton = () => {
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const handleOpenHelpModal = () => {
    setOpenHelpModal(true);
    setSelectedSection(null); // Reset section selection when modal opens
  };

  const handleCloseHelpModal = () => {
    setOpenHelpModal(false);
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
  };
  const sections = [
    { label: 'Messages', value: 'messages' },
    { label: 'Help', value: 'help' },
    { label: "FAQ's", value: 'faqs' },
  ];
  const faqItems = [
    {
      question: 'What types of grants can I expect to see?',
      answer: 'Our platform curates grants from a wide range of sources, including government programs, local councils, private foundations, and industry-specific funds. Expect to see grants that align with your industry, location, and business type.',
    },
    {
      question: 'What is the deadline for applications?',
      answer: 'The deadlines vary for each grant. Check the grant details.',
    },
    {
      question: 'How do I track my application?',
      answer: 'You can track your application in the "Track Applications" section.',
    },
    {
      question: 'Can I edit my application after submission?',
      answer: 'No, once submitted, the application cannot be edited.',
    },
    
 {
  question: 'What information do I need to provide for the platform to match me with grants?',
  answer: 'To optimise matching, we recommend filling out your business profile with details like your industry, business goals, financial status and project needs. The more comprehensive your profile, the more accurate your matches will be.',
 },
 {
  question: 'How does the platform find relevant grants for my business?',
  answer: 'The platform uses AI-driven matching algorithms to assess your business profile and needs, then compares it with our comprehensive database of thousands of grants to find the most relevant opportunities.',
 }
  ];

  const helpItems = [
    { question: 'How do I contact support?', answer: 'You can contact support by emailing us at support@example.com.' },
    {
      question: 'Where can I find more resources?',
      answer: 'Visit our Help Center for additional resources and guides.',
    },
    {
      question: 'Can I talk to a representative?',
      answer: 'Yes, schedule a call with one of our representatives through the contact page.',
    },
  ];
  return (
    <div>
      {/* Floating Help Button */}
      <Fab
        color="primary"
        aria-label="help"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpenHelpModal}
      >
        <HelpOutlineIcon />
      </Fab>

      {/* Help Modal */}
      <Dialog
        open={openHelpModal}
        onClose={handleCloseHelpModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: 16,
            right: 16,
            margin: 0,
            width: '100%',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            We re here to help
          </Typography>
          <IconButton onClick={handleCloseHelpModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedSection === null ? (
            <List sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
              {sections.map((section) => (
                <>
                <ListItem button key={section.value} onClick={() => handleSelectSection(section.value)}>
                    <ListItemText primary={section.label} />
                  </ListItem>
                  <Divider  sx={{ width: '100%', height: '1px',}} />
                </>
              ))}
            </List>
          ) : selectedSection === 'faqs' ? (
            // FAQ Section
            <Box>
              {faqItems.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : selectedSection === 'help' ? (
            // Help Section
            <Box>
              {helpItems.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">No information available for this section.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingHelpButton;
