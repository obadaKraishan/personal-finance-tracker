// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../services/eventService';
import { Typography } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    console.log("Fetched ID:", id); // Debugging line
    const loadEvent = async () => {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Error loading event:', error);
      }
    };
    loadEvent();
  }, [id]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <Typography variant="h4">{event.name}</Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Typography variant="body2">Date: {new Date(event.date).toDateString()}</Typography>
    </div>
  );
};

export default EventDetails;
