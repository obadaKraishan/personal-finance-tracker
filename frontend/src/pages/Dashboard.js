// Full path: src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/dashboardService';
import { Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalRegistrations: 0,
    upcomingEvents: [],
    users: [],
    registrations: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        console.log('Fetched Dashboard Stats:', data);

        setStats({
          ...data,
          upcomingEvents: data.upcomingEvents || [],
          users: data.users || [],
          registrations: data.registrations || [],
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
    loadStats();
  }, []);

  const handleCardClick = (type) => {
    let title = '';
    let content = '';

    if (type === 'events') {
      title = 'All Events';
      console.log('Upcoming Events:', stats.upcomingEvents);
      content = stats.upcomingEvents.length > 0 ? (
        <List>
          {stats.upcomingEvents.map((event) => (
            <ListItem key={event._id}>
              <ListItemText primary={`${event.name} - ${new Date(event.date).toDateString()}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No events available.</Typography>
      );
    } else if (type === 'users') {
      title = 'All Users';
      console.log('Users:', stats.users);
      content = stats.users.length > 0 ? (
        <List>
          {stats.users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={`${user.name} - ${user.email}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No users available.</Typography>
      );
    } else if (type === 'registrations') {
      title = 'All Registrations';
      console.log('Registrations:', stats.registrations);
      content = stats.registrations.length > 0 ? (
        <List>
          {stats.registrations.map((registration) => (
            <ListItem key={registration._id}>
              <ListItemText primary={`${registration.user.name} registered for ${registration.event.name}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No registrations available.</Typography>
      );
    }

    setDialogTitle(title);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('events')} className="dashboard-card">
            <CardContent>
              <EventIcon className="dashboard-icon" />
              <Typography variant="h5">Total Events</Typography>
              <Typography variant="h4">{stats.totalEvents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('users')} className="dashboard-card">
            <CardContent>
              <PeopleIcon className="dashboard-icon" />
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('registrations')} className="dashboard-card">
            <CardContent>
              <AssignmentIcon className="dashboard-icon" />
              <Typography variant="h5">Total Registrations</Typography>
              <Typography variant="h4">{stats.totalRegistrations || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContent}
        </DialogContent>
        <Button onClick={handleCloseDialog} color="primary">Close</Button>
      </Dialog>
    </>
  );
};

export default Dashboard;
