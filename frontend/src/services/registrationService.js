import api from "./api";

export const registerForEvent = async (eventId) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      const response = await api.post('/registrations/register', { eventId }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in registerForEvent:', error.response ? error.response.data : error.message); // Log detailed error
      throw error;
    }
  };

export const getRegistrationsForUser = async () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const response = await api.get("/registrations/my-registrations", {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
  return response.data;
};
