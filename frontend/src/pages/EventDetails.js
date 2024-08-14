import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById, deleteEvent } from '../services/eventService';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditEventForm from '../components/EditEventForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
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

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteEvent(id);
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Organized by: {event.organizer}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {event.description}
        </Typography>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6">Location:</Typography>
        <Typography variant="body2">
          {event.location.venue}, {event.location.city}, {event.location.state}, {event.location.country}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Date:</Typography>
        <Typography variant="body2">
          {new Date(event.date).toDateString()}
        </Typography>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6">Categories:</Typography>
        <Typography variant="body2">
          {event.categories.join(', ')}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Speakers:</Typography>
        <ul>
          {event.speakers.map((speaker, index) => (
            <li key={index}>
              <Typography variant="body2">
                {speaker.name} - {speaker.topic}
              </Typography>
            </li>
          ))}
        </ul>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Sponsors:</Typography>
        <Typography variant="body2">
          {event.sponsors.join(', ')}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>Schedule:</Typography>
        <ul>
          {event.schedule.map((item, index) => (
            <li key={index}>
              <Typography variant="body2">
                {item.time} - {item.activity}
              </Typography>
            </li>
          ))}
        </ul>

        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit Event
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>
            Delete Event
          </Button>
        </Box>
      </CardContent>

      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <EditEventForm event={event} onClose={handleCloseEditDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EventDetails;
