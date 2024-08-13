import api from './api';

// Function to fetch all events
export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
};

// Function to save a new event
export const saveEvent = async (event) => {
  try {
    const response = await api.post('/events/create', event);
    return response.data;
  } catch (error) {
    console.error('Failed to save event:', error);
    throw error;
  }
};

// Function to update an existing event
export const updateEvent = async (id, event) => {
  try {
    const response = await api.put(`/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error('Failed to update event:', error);
    throw error;
  }
};

// Function to delete an event
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw error;
  }
};
