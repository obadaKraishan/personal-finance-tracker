import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { updateEvent } from '../services/eventService';

const EditEventForm = ({ event, onClose }) => {
  const [eventData, setEventData] = useState(event);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedEvent = {
      ...eventData,
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

    await updateEvent(eventData.id, formattedEvent);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Name" name="name" fullWidth margin="normal" value={eventData.name} onChange={handleChange} />
      <TextField label="Description" name="description" fullWidth margin="normal" value={eventData.description} onChange={handleChange} />
      <TextField type="date" name="date" fullWidth margin="normal" value={eventData.date} onChange={handleChange} />
      <TextField label="Organizer" name="organizer" fullWidth margin="normal" value={eventData.organizer} onChange={handleChange} />
      <TextField label="Venue" name="venue" fullWidth margin="normal" value={eventData.location.venue} onChange={handleChange} />
      <TextField label="City" name="city" fullWidth margin="normal" value={eventData.location.city} onChange={handleChange} />
      <TextField label="State" name="state" fullWidth margin="normal" value={eventData.location.state} onChange={handleChange} />
      <TextField label="Country" name="country" fullWidth margin="normal" value={eventData.location.country} onChange={handleChange} />
      <TextField label="Categories (comma-separated)" name="categories" fullWidth margin="normal" value={eventData.categories.join(', ')} onChange={handleChange} />
      <TextField label="Speakers (name:topic, comma-separated)" name="speakers" fullWidth margin="normal" value={eventData.speakers.map(sp => `${sp.name}:${sp.topic}`).join(', ')} onChange={handleChange} />
      <TextField label="Sponsors (comma-separated)" name="sponsors" fullWidth margin="normal" value={eventData.sponsors.join(', ')} onChange={handleChange} />
      <TextField label="Schedule (time:activity, comma-separated)" name="schedule" fullWidth margin="normal" value={eventData.schedule.map(sch => `${sch.time}:${sch.activity}`).join(', ')} onChange={handleChange} />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditEventForm;
