// Full path: src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Drawer, IconButton, CircularProgress } from '@mui/material';
import EventList from '../components/EventList';
import AddEventForm from '../components/AddEventForm';
import { fetchEvents } from '../services/eventService';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchEvents(filters);
    setEvents(data);
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      date: '',
      location: '',
      category: '',
    });
  };

  return (
    <div>
      <h1>Upcoming Events</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        style={{ marginBottom: '20px' }}
      >
        Add New Event
      </Button>

      <IconButton
        color="primary"
        onClick={() => setIsFilterDrawerOpen(true)}
        style={{ marginLeft: '10px' }}
      >
        <FilterListIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#f7f7f7',
            padding: '20px',
            width: '320px',
            borderRadius: '10px',
          },
        }}
      >
        <div>
          <Typography variant="h5" gutterBottom>Filter Events</Typography>

          <TextField
            label="Filter by Date"
            type="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Filter by Location"
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Filter by Category"
            type="text"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Clear Filters
          </Button>
        </div>
      </Drawer>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <EventList events={events} />
      )}

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
