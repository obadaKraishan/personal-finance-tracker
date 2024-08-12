const fs = require('fs');
const path = require('path');

const loadEvents = () => {
  const filePath = path.join(__dirname, '../data/events.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

module.exports = loadEvents;
