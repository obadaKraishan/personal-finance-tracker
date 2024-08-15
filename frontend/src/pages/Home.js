// Full path: src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EventList from '../components/EventList';
import AddEventForm from '../components/AddEventForm';
import { fetchEvents } from '../services/eventService';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    handleCloseAddDialog();
  };

  return (
    <div>
      <h1>Upcoming Events</h1>
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add New Event
      </Button>
      <EventList events={events} />
      
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <AddEventForm onClose={handleCloseAddDialog} onEventAdded={handleEventAdded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
