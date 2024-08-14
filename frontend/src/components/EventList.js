// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      }
    };
    loadEvents();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      {events.map((event) => (
        <Card key={event.id} style={{ marginBottom: '20px' }}> {/* Use event.id or event._id depending on your JSON structure */}
          <CardContent>
            <Typography variant="h5">{event.name}</Typography>
            <Typography variant="body2">{event.description}</Typography>
            <Typography variant="body2">Date: {new Date(event.date).toDateString()}</Typography>
            <Button
              component={Link}
              to={`/events/${event.id}`}  
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
