import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Drawer, IconButton } from '@mui/material';
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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents(filters);
      setEvents(data);
    };
    loadEvents();
  }, [filters]);

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
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }, 500));
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
      >
        <div style={{ padding: '20px', width: '300px' }}>
          <h3>Filter Events</h3>

          <TextField
            label="Filter by Date"
            type="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Filter by Location"
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Filter by Category"
            type="text"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
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
