// frontend/src/services/eventService.js
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
