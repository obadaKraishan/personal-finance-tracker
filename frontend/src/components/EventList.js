import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import { Card, CardContent, Typography } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <div>
      {events.map((event) => (
        <Card key={event._id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">{event.name}</Typography>
            <Typography variant="body2">{event.description}</Typography>
            <Typography variant="body2">Date: {new Date(event.date).toDateString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
