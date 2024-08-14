// backend/utils/saveEvents.js
const fs = require('fs');
const path = require('path');

const saveEvents = (events) => {
  const filePath = path.join(__dirname, 'events.json');
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
};

module.exports = saveEvents;
