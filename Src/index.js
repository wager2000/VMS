const express = require("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8200;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

app.use(express.static('public')); // This line will serve your static files (html, css, js) in the public directory

//Gør så den kommer som en string, ved hjælp af at sende den som et json objekt
app.use(express.json());


//tjekker at porten fungerer
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


const sqlite3 = require('sqlite3').verbose();
express.static.mime.types['js'] = 'application/javascript';

let db = new sqlite3.Database('./database.sqlite');

app.use(express.json()); // for parsing application/json

app.post('/register', function (req, res) {
  const { userName, userEmail, userPassword, userDepartment, isAdmin } = req.body;

  db.run(
    'INSERT INTO users(name, email, password, department, admin) VALUES(?, ?, ?, ?, ?)',
    [userName, userEmail, userPassword, userDepartment, isAdmin],
    (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('New user registered successfully!');
      }
    }
  );
});

