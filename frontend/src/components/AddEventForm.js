import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { saveEvent } from '../services/eventService';

const AddEventForm = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    organizer: '',
    venue: '',
    city: '',
    state: '',
    country: '',
    categories: '',
    speakers: '',
    sponsors: '',
    schedule: ''
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedEvent = {
      ...eventData,
      id: Date.now().toString(), // Unique ID
      categories: eventData.categories.split(',').map(cat => cat.trim()),
      speakers: eventData.speakers.split(',').map(sp => {
        const [name, topic] = sp.split(':');
        return { name: name.trim(), topic: topic.trim() };
      }),
      sponsors: eventData.sponsors.split(',').map(sp => sp.trim()),
      schedule: eventData.schedule.split(',').map(sch => {
        const [time, activity] = sch.split(':');
        return { time: time.trim(), activity: activity.trim() };
      }),
      location: {
        venue: eventData.venue,
        city: eventData.city,
        state: eventData.state,
        country: eventData.country,
      }
    };

    await saveEvent(formattedEvent);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Description" name="description" fullWidth margin="normal" onChange={handleChange} />
      <TextField type="date" name="date" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Organizer" name="organizer" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Venue" name="venue" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="City" name="city" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="State" name="state" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Country" name="country" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Categories (comma-separated)" name="categories" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Speakers (name:topic, comma-separated)" name="speakers" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Sponsors (comma-separated)" name="sponsors" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Schedule (time:activity, comma-separated)" name="schedule" fullWidth margin="normal" onChange={handleChange} />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Event
      </Button>
    </Box>
  );
};

export default AddEventForm;
