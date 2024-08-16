import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/dashboardService';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
    loadStats();
  }, []);

  if (!stats) {
    return <p>Loading dashboard data...</p>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Events</Typography>
            <Typography variant="h4">{stats.totalEvents}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Registrations</Typography>
            <Typography variant="h4">{stats.totalRegistrations}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Upcoming Events</Typography>
            <ul>
              {stats.upcomingEvents.map((event) => (
                <li key={event._id}>
                  <Typography variant="body1">
                    {event.name} - {new Date(event.date).toDateString()}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
