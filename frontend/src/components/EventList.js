// Full path: src/components/EventList.js

import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event._id} event={event} /> // Use _id for MongoDB
      ))}
    </div>
  );
};

export default EventList;
