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
export default class User {
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
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.versions = [];
    }

    addVersion(version) {
        this.versions.push(version);
    }

    removeVersion(id) {
        this.versions = this.versions.filter(version => version.id !== id);
    }

    getVersionById(id) {
        return this.versions.find(version => version.id === id);
    }


}

class Version {
    constructor(id, versionNumber, releaseDate) {
        this.id = id;
        this.versionNumber = versionNumber;
        this.releaseDate = releaseDate;
    }
}

