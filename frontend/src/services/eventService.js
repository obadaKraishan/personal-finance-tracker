import api from './api';

export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await api.post('/events/create', eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
