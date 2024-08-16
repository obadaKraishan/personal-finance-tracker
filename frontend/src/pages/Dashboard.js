import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/dashboardService';
import { Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState(null);

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

  const handleCardClick = (type) => {
    let title = '';
    let content = '';

    if (type === 'events' && stats.upcomingEvents) {
      title = 'Upcoming Events';
      content = stats.upcomingEvents.length > 0 ? (
        <List>
          {stats.upcomingEvents.map(event => (
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
      content = stats.totalUsers > 0 ? (
        <List>
          {stats.users.map(user => (
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
      content = stats.totalRegistrations > 0 ? (
        <List>
          {stats.registrations.map(registration => (
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

  if (!stats) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('events')} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5">Total Events</Typography>
              <Typography variant="h4">{stats.totalEvents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('users')} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleCardClick('registrations')} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5">Total Registrations</Typography>
              <Typography variant="h4">{stats.totalRegistrations || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for showing summaries */}
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
