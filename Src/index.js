const express = require("express");
const app = express();
const PORT = process.env.PORT || 8200;
const User = require("./models/class");
const Software = require("./models/class");
const softwareHondtering = require("./models/class");
const Ticket = require("./models/class");
const Version = require("./models/class");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});
app.get("/version", (req, res) => {
  res.sendFile(__dirname + "/public/version.html");
});

app.use(express.static("public")); // This line will serve your static files (html, css, js) in the public directory

//Gør så den kommer som en string, ved hjælp af at sende den som et json objekt
app.use(express.json());

//tjekker at porten fungerer
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

const sqlite3 = require("sqlite3").verbose();
express.static.mime.types["js"] = "application/javascript";

let db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.post("/register", function (req, res) {
  const user = new User(
    null,
    req.body.userName,
    req.body.userEmail,
    "X",
    req.body.userDepartment,
    req.body.isAdmin
  );
  console.log(user.department);
  db.run(
    `INSERT INTO users(name, email, password, department, admin) VALUES ("${user.name}", "${user.email}", "${user.password}", "${user.department}", "${user.isAdmin}")`,
    (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send("New user registered successfully!");
      }
    }
  );
});

app.post("/addSoftware", (req, res) => {
  const { softwareName, softwareDateVersion } = req.body;

  let software = new Software(null, softwareName, softwareDateVersion);
  software.addSoftware(db, (response) => {
    res.send(response);
  });
});

app.post("/assignSoftware", (req, res) => {
  const assignSoftware = new softwareHondtering(
    req.body.Email,
    req.body.softwareName
  );
  assignSoftware.tildelSoftware;
  res.send({ success: true, msg: "Software assigned successfully" });
});

app.post("/updateVersion", (req, res) => {
  let date = new Date()
  const ticket = new Ticket(
    null,
    req.body.softwareName,
    req.body.details,
    date,
    null,
    "open"
  );
  const version = new Version(
    req.body.version,
    req.body.softwareName,
    req.body.details,
    req.body.date
  );
  const user = new User(
    null,
    "testUser",
    "testEmail",
    null,
    "testDepartment",
    null
  );
  console.log(version)

  function createTicket(ticket, version, user){
    //Denne funktion vil stå for at sende en mail til Servicenow,
    //men opfyldes først i et videre forløb efter prototyper og test.
  }
  res.send({ success: true, msg: "Software assigned successfully" });
});

app.use(express.json());
