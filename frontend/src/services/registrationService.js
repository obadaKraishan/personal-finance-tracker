import api from './api';

export const registerForEvent = async (eventId) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const response = await api.post('/registrations/register', { eventId }, {
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the Authorization header
    }
  });
  return response.data;
};

export const getRegistrationsForUser = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const response = await api.get('/registrations/my-registrations', {
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the Authorization header
    }
  });
  return response.data;
};
