import api from './api';

export const registerForEvent = async (eventId) => {
  const response = await api.post('/api/registrations/register', { eventId });
  return response.data;
};

export const getRegistrationsForUser = async () => {
  const response = await api.get('/api/registrations/my-registrations');
  return response.data;
};
