class TicketSystem {
    constructor() {
        this.tickets = [];
    }

    addTicket(ticket) {
        this.tickets.push(ticket);
    }

    removeTicket(id) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    }

    getTicketById(id) {
        return this.tickets.find(ticket => ticket.id === id);
    }

    updateTicket(id, updatedTicket) {
        const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex !== -1) {
            this.tickets[ticketIndex] = updatedTicket;
        }
    }
}
class Ticket {
    constructor(id, title, description, status, assignedTo, createdBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignedTo = assignedTo;
        this.createdBy = createdBy;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    assignUser(user) {
        this.assignedTo = user;
    }
}
 class User {
    constructor(id, name, email, password, department, isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.isAdmin = isAdmin;
    }
}




class Software {
    constructor(id, name, publication_date) {
        this.id = id;
        this.name = name;
        this.publication_date = publication_date;
    }

    addSoftware(db, callback) {
        let sql = `INSERT INTO software (name, publication_date) VALUES (?, ?)`;
        let values = [this.name, this.publication_date];

        db.run(sql, values, function(err) {
            if (err) {
                console.error(err.message);
                callback({ success: false, msg: 'Failed to add software. Please try again.' });
            } else {
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                callback({ success: true, msg: 'Software added successfully' });
            }
        });
    }
}


class Version {
    constructor(id, versionNumber, releaseDate) {
        this.id = id;
        this.versionNumber = versionNumber;
        this.releaseDate = releaseDate;
    }
}


module.exports = User, Software;