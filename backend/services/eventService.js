import api from './api';

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event by ID:', error);
    throw error;
  }
};

export const updateEvent = async (id, updatedEvent) => {
  try {
    const response = await api.put(`/events/${id}`, updatedEvent);
    return response.data;
  } catch (error) {
    console.error('Failed to update event:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await api.delete(`/events/${id}`);
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw error;
  }
};

export const saveEvent = async (newEvent) => {
  try {
    const response = await api.post('/events', newEvent);
    return response.data;
  } catch (error) {
    console.error('Failed to save event:', error);
    throw error;
  }
};
