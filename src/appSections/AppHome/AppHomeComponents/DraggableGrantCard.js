/* eslint-disable react/prop-types */
import React from 'react';
import { useDrag } from 'react-dnd';
import GrantCard from './GrantCard';
import { Box } from '@mui/material';
import { calculateProgress } from '../../../utilities/helperFunctions';
const DraggableGrantCard = ({ grant, index, removeFromList }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'GRANT',
    item: { grant, index, removeFromList },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        width: '100%',
        marginRight: '8px',
        // Ensure the draggable item takes full width
      }}
    >
      <GrantCard
        progress={calculateProgress(grant)}
        grantTitle={grant.grant.name}
        deadline={grant.grant.valid_to}
        description={grant.grant.description}
        applicationid={grant._id}
        status={grant.status}
      />
    </Box>
  );
};

export default DraggableGrantCard;
