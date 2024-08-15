import React, { useState, useEffect } from 'react';
import { getRegistrationsForUser } from '../services/registrationService';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

const Tickets = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const data = await getRegistrationsForUser();
        setRegistrations(data);
      } catch (error) {
        console.error('Error loading registrations:', error);
      }
    };
    loadRegistrations();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      {registrations.map((registration) => (
        <Card key={registration._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{registration.event.name}</Typography>
            <Typography variant="body2">Ticket Number: {registration.ticketNumber}</Typography>
            <Typography variant="body2">Event Date: {new Date(registration.event.date).toDateString()}</Typography>
            <Typography variant="body2">Registered on: {new Date(registration.registrationDate).toDateString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Tickets;
