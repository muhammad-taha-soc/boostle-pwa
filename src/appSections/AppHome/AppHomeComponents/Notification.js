import React from 'react';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Clock icon
import EventIcon from '@mui/icons-material/Event'; // Calendar icon
import './Styles/notification.scss'; // Import the new SCSS file

const notifications = [
  {
    id: 1,
    date: '25 September 2024',
    time: '12:34:56',
    title: 'Grant Application Deadline',
    description: 'The “New EV Grant” has its deadline tomorrow, 26 September 2024. Hurry up!',
    borderClass: 'notification-border-purple', // Using a class for the border color
  },
  {
    id: 2,
    date: '24 September 2024',
    time: '14:12:45',
    title: 'Add Document to Data Vault',
    description: 'We need a Financial Report for your business!',
    borderClass: 'notification-border-red', // Using a class for the border color
  },
  {
    id: 3,
    date: '24 September 2024',
    time: '14:12:45',
    title: 'Add Document to Data Vault',
    description: 'We need a Financial Report for your business!',
    borderClass: 'notification-border-purple', // Using a class for the border color
  },

];

function Notifications() {
  return (
    <Box className="notifications-container">
      <Box className="notifications-header">
        <Typography variant="h5" fontWeight="bold">
          Notifications
        </Typography>
        <Button variant="text" color="primary">
          Archive All
        </Button>
      </Box>

      <Box className="notifications-list">
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              className={`notification-item ${notification.borderClass}`} // Use the dynamic border class
            >
              <Box className="notification-metadata">
                <EventIcon className="event-icon" />
                <Typography variant="body2">{notification.date}</Typography>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  •
                </Typography>
                <AccessTimeIcon className="time-icon" />
                <Typography variant="body2">{notification.time}</Typography>
              </Box>

              <ListItemText
                primary={
                  <Typography variant="h6" className="notification-title">
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" className="notification-description">
                    {notification.description}
                  </Typography>
                }
              />

              <IconButton size="small" className="notification-more-icon">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="see-all-notifications">
        <Button variant="text" color="primary">
          See All Notifications
        </Button>
      </Box>
    </Box>
  );
}

export default Notifications;
