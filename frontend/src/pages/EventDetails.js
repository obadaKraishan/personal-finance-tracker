import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../services/eventService';
import { Typography, Card, CardContent } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await fetchEventById(id);
      setEvent(data);
    };
    loadEvent();
  }, [id]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h4">{event.name}</Typography>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          {event.description}
        </Typography>
        <Typography variant="body2" style={{ marginTop: '20px' }}>
          Date: {new Date(event.date).toDateString()}
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Organizer: {event.organizer.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
