// Full path: src/components/EventList.js

import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    category: '',
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(filters);
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      }
    };
    loadEvents();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      <div>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          placeholder="Filter by Date"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleInputChange}
          placeholder="Filter by Location"
        />
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          placeholder="Filter by Category"
        />
      </div>
      {events.map((event) => (
        <EventCard key={event._id} event={event} /> // Use _id for MongoDB
      ))}
    </div>
  );
};

export default EventList;
