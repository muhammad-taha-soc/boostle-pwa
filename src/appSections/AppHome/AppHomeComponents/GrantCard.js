/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent, CircularProgress, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getApplicationStartDate, getDaysRemainingWithFiveDaysSubtracted } from '../../../utilities/helperFunctions';
import MaterialButton from '../../../components/Button/MaterialButton';
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const GrantCard = ({
  progress,
  grantTitle,
  description,
  deadline,
  attachments,
  applicationStartDate,
  applicationid,
  status,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    console.log(`${action} clicked!`);
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2,
        marginRight: 1,
        padding: '12px',
        borderRadius: '12px',
        width: '100%',
        cursor: 'pointer',

        backgroundColor: '#f1eefc', // Light purple backgroundx
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        {/* Progress Circle */}
        <Box
          sx={{ position: 'relative', display: 'inline-flex', marginRight: 2 }}
          // onClick={() => {
          //   navigate(`/grantdetails/${applicationid}/${status}`);
          // }}
        >
          <CircularProgress
            variant="determinate"
            value={progress === 0 ? 100 : progress}
            size={40} // Adjusted size
            thickness={2.5}
            color="primary"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              sx={{ fontWeight: 'bold', fontSize: '10px', textAlign: 'center' }}
            >
              {progress === 100 && 'DONE'}
              {progress === 0 && 'Start'}
              {progress > 0 && progress < 100 && `${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>

        {/* Grant Info */}
        <CardContent sx={{ flexGrow: 1, padding: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: '600',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {grantTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '500',
              fontSize: '12px',
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          {/* Metadata (Deadline and Attachments) */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <CalendarTodayIcon sx={{ fontSize: '10px', marginRight: '4px' }} />
            <Typography variant="caption" sx={{ fontFamily: 'Poppins', fontSize: '10px', marginRight: '8px' }}>
              {applicationStartDate
                ? `Application started ${getApplicationStartDate(applicationStartDate)}`
                : deadline
                  ? ` ${getDaysRemainingWithFiveDaysSubtracted(deadline)} days left to submit`
                  : ''}
            </Typography>
            {/* <AttachFileIcon sx={{ fontSize: '10px', marginRight: '4px' }} />
            <Typography variant="caption" sx={{ fontSize: '10px' }}>
              {attachments} files attached
            </Typography> */}
          </Box>
        </CardContent>
        {isHovered && (
          <Box>
            {status === 'not_started' && (
              <MaterialButton
                variant="contained"
                size="small"
                onClick={() => navigate(`/grantdetails/${applicationid}/${status}`)}
              >
                View
              </MaterialButton>
            )}
            {status === 'in_progress' && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate(`/grantdetails/${applicationid}/${status}`)}
              >
                Continue
              </Button>
            )}
            {status === 'submitted' && (
              <Typography variant="body2" color="textSecondary">
                Waiting for outcome
              </Typography>
            )}
          </Box>
        )}
        {/* Three-Dot Menu */}
        <IconButton aria-label="more" onClick={handleMenuOpen} sx={{ padding: 0 }}>
          <MoreVertIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {/* <MenuItem onClick={() => handleMenuAction('Edit')}>Edit</MenuItem> */}
          <MenuItem onClick={() => handleMenuAction('Delete')}>Delete</MenuItem>
          {/* <MenuItem onClick={() => handleMenuAction('View Details')}>View Details</MenuItem> */}
        </Menu>
      </Box>
    </Card>
  );
};

GrantCard.propTypes = {
  progress: PropTypes.number.isRequired,
  grantTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  attachments: PropTypes.number,
  applicationStartDate: PropTypes.string,
  applicationid: PropTypes.string.isRequired,
  status: PropTypes.string,
};

GrantCard.defaultProps = {
  attachments: 0,
};

export default GrantCard;
