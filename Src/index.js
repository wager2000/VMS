const express = require("express");
const app = express();
const PORT = process.env.PORT || 8200;
const User = require("./models/class");
const Software = require("./models/class")


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});
app.get('/version', (req, res) => {
  res.sendFile(__dirname + '/public/version.html');
});


app.use(express.static('public')); // This line will serve your static files (html, css, js) in the public directory

//Gør så den kommer som en string, ved hjælp af at sende den som et json objekt
app.use(express.json());


//tjekker at porten fungerer
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


const sqlite3 = require('sqlite3').verbose();
express.static.mime.types['js'] = 'application/javascript';

let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } 
})
  

  

/*
  db.run(`DROP TABLE IF EXISTS software`, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Software table dropped successfully!");

    db.run(`CREATE TABLE software (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      publication_date TEXT NOT NULL,
      owner INTEGER,
      FOREIGN KEY (owner) REFERENCES Users(id)
    )`, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Software table created successfully!");
    });
  
});



*/




app.post('/register', function (req, res) {
  console.log(req.body)
  const { userName, userEmail, userPassword, userDepartment, isAdmin } = req.body;

  const user = new User(null, userName, userEmail, userPassword, userDepartment, isAdmin);

  db.run(
    'INSERT INTO users(name, email, department, admin) VALUES(?, ?, ?, ?, ?)',
    [user.name, user.email, user.department, user.isAdmin],
    (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('New user registered successfully!');
      }
    }
  );
});

app.post('/addSoftware', (req, res) => {
  const { softwareName, softwareDateVersion } = req.body;

  let software = new Software(null, softwareName, softwareDateVersion);
  software.addSoftware(db, (response) => {
      res.send(response);
  });
});


app.post('/assignSoftware', (req, res) => {
  console.log(req.body); // Log the request body

  const { softwareName, Email } = req.body;

  let sql = `UPDATE software SET owner = (SELECT id FROM Users WHERE email = ?) WHERE name = ?`;
  let values = [Email, softwareName];

  db.run(sql, values, function(err) {
    if (err) {
      console.error(err.message); // Log any errors
      res.send({ success: false, msg: 'Error updating the database' });
      return;
    }
    console.log(`Rows updated: ${this.changes}`); // Log the number of rows updated
    res.send({ success: true, msg: 'Software assigned successfully' });
  });
});

app.use(express.json()); // for parsing application/json
