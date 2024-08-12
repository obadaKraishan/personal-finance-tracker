import React, { useState } from 'react';
import { Button, Container, Typography, Modal, Box } from '@mui/material';
import AddEventForm from '../components/AddEventForm';
import EventList from '../components/EventList';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Event Dashboard
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Event
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <AddEventForm onClose={handleClose} />
        </Box>
      </Modal>

      <EventList />
    </Container>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Dashboard;
