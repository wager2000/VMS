const sqlite3 = require('sqlite3').verbose();

export const db = new sqlite3.Database('./vms.db', (err) => {
  // ...
});

// Function to initialize the database