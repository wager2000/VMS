const express = require("express");
const sqlite3 = require("sqlite3").verbose();
express.static.mime.types["js"] = "application/javascript";
let db = new sqlite3.Database("./../database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
});

//Users
class User {
  constructor(id, name, email, password, department, isAdmin) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.department = department;
    this.isAdmin = isAdmin;
  }
  showUsers() {
    //To be made
  }
  createUser() {
    //To be made
  }
  deleteUser() {
    //To be made
  }
  updateUserInformation() {
    //To be made
  }
  logIn() {
    //To be made
  }
  logOut() {
    //To be made
  }
  
}

//Software/Systems
class softwareHondtering {
  constructor(email, software) {
    this.email = email;
    this.software = software;
  }

  get tildelSoftware() {
    let sql = `UPDATE software SET owner = (SELECT id FROM Users WHERE email = ?) WHERE name = ?`;
    let values = [this.email, this.software];

    db.run(sql, values, function (err) {
      if (err) {
        console.error(err.message); // Log any errors
        res.send({ success: false, msg: "Error updating the database" });
        return;
      }
      console.log(`Rows updated: ${this.changes}`); // Log the number of rows updated
    });
    return "succes";
  }

  removeSoftwareFromUser() {
    //To be made
  }
}

/*const assignSoftware = new softwareHondtering(
   "X",
  "Software 3"
);
console.log(assignSoftware.tildelSoftware);*/

class Software {
  constructor(id, name, publication_date) {
    this.id = id;
    this.name = name;
    this.publication_date = publication_date;
  }
  deleteSoftware() {
    //To be made
  }
  createSoftware() {
    //To be made
  }
  changeSoftware() {
    //To be made
  }
}

//Versions
class Version {
  constructor(versionNumber, software, changes, releaseDate) {
    this.versionNumber = versionNumber;
    this.software = software;
    this.changes = changes;
    this.releaseDate = releaseDate;
  }
}

//Tickets
class ticketAdministrator {
  constructor() {
    this.tickets = [];
  }

  createTicket(ticket) {
    //To be made
  }

  closeTicket(id) {
    //To be made
  }
}

class Ticket {
  constructor(id, title, description, dateCreated, dateClosed, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateClosed = dateClosed;
    this.status = status;
  }
}

//Mail
class mail {
  receiveMail() {
    //To be made
  }
  sendMail() {
    //To be made
  }
}

(module.exports = User), Software, softwareHondtering, Ticket, Version;
