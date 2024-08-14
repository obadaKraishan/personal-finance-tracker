// src/components/EventCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5">{event.name}</Typography>
        <Typography variant="body2">{event.description}</Typography>
        <Typography variant="body2">Date: {new Date(event.date).toDateString()}</Typography>
        <Button
          component={Link}
          to={`/events/${event.id}`}  // Adjust the path if necessary
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
