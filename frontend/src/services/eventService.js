import api from './api';

export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const fetchEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};
