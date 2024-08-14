const fs = require('fs');
const path = require('path');

const saveEvents = (events) => {
  // Adjust the file path to point to the backend/data directory
  const filePath = path.resolve(__dirname, '../data/events.json');
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
};

module.exports = saveEvents;
