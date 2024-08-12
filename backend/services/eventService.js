import api from './api';

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
};
