import api from './api';

export const fetchRegistrations = async () => {
  try {
    const response = await api.get('/registrations');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    throw error;
  }
};

export const registerForEvent = async (eventId) => {
  try {
    const response = await api.post('/registrations/register', { eventId });
    return response.data;
  } catch (error) {
    console.error('Error in registerForEvent:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRegistrationsForUser = async () => {
  try {
    const response = await api.get('/registrations/my-registrations');
    return response.data;
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    throw error;
  }
};
