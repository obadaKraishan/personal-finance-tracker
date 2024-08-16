import api from './api';

export const fetchDashboardStats = async () => {
  try {
    const [eventsResponse, usersResponse, registrationsResponse] = await Promise.all([
      api.get('/events'),
      api.get('/users'),
      api.get('/registrations'),
    ]);

    return {
      totalEvents: eventsResponse.data.length,
      totalUsers: usersResponse.data.length,
      totalRegistrations: registrationsResponse.data.length,
      upcomingEvents: eventsResponse.data.filter(event => new Date(event.date) > new Date()),
      users: usersResponse.data,
      registrations: registrationsResponse.data,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
};
