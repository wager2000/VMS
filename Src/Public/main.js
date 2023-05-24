const button = document.getElementById("submit1");

button.onclick = function (e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userDepartment = document.getElementById('userDepartment').value;
    const isAdmin = document.getElementById('isAdmin').value;
    console.log(userName, userEmail, userDepartment, isAdmin)
  
    fetch('http://localhost:8200/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        userEmail,
        userDepartment,
        isAdmin,
      }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  document.getElementById('addSoftwareForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    let softwareName = document.getElementById('softwareName').value;
    let softwareDateVersion = document.getElementById('softwareDateVersion').value;

    fetch('/addSoftware', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            softwareName: softwareName,
            softwareDateVersion: softwareDateVersion
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Software added successfully!');
        } else {
            alert('Failed to add software. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

  document.getElementById('assignSoftwareForm').addEventListener('submit', function(event) {
    event.preventDefault();  
  
    let softwareName = document.getElementById('softwareName').value;
    let Email = document.getElementById('Email').value;
  
    console.log(`Assigning ${softwareName} to ${Email}`); // Log the inputs
  
    fetch('/assignSoftware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        softwareName: softwareName,
        Email: Email
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the server response
      if (data.success) {
        alert('Software assigned successfully!');
      } else {
        alert('Failed to assign software. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
/*
// Helper function to find a software by ID
function findSoftwareById(softwareId) {
    return softwareList.find(software => software.id === softwareId);
}

// Login and logout buttons
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

loginBtn.addEventListener('click', () => adminUser.loginUser());
logoutBtn.addEventListener('click', () => adminUser.logoutUser());

// Create user form
const createUserForm = document.getElementById('create-user-form');
createUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    const newUser = new User(users.length + 1, name, email, password, department, isAdmin);
    users.push(newUser);
    console.log(users);
});

// Create software form
const createSoftwareForm = document.getElementById('create-software-form');
createSoftwareForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const softwareName = document.getElementById('software-name').value;

    const newSoftware = new Software(softwareList.length + 1, softwareName);
    softwareList.push(newSoftware);
    console.log(softwareList);
});

// Create version form
const createVersionForm = document.getElementById('create-version-form');
createVersionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const versionName = document.getElementById('version-name').value;
    const releaseDate = document.getElementById('release-date').value;

    const newVersion = new Version(softwareList.length + 1, versionName, new Date(releaseDate));
    console.log(newVersion);
});

// Assign software to user form
const assignSoftwareForm = document.getElementById('assign-software-form');
assignSoftwareForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userId = parseInt(document.getElementById('user-id').value, 10);
    const softwareId = parseInt(document.getElementById('software-id').value, 10);

    const user = findUserById(userId);
    const software = findSoftwareById(softwareId);

    if (user && software) {
        user.assignSoftware(software);
        console.log(`Assigned software ${software.name} to user ${user.name}`);
    } else {
        console.error('User or software not found.');
    }
});

document.getElementById('viewSystemOwners').addEventListener('click', viewSystemOwners);
document.getElementById('viewAllSoftware').addEventListener('click', viewAllSoftware);
document.getElementById('assignSoftware').addEventListener('click', assignSoftware);
document.getElementById('removeSoftware').addEventListener('click', removeSoftware);
document.getElementById('addSoftware').addEventListener('click', addSoftware);
document.getElementById('registerUser').addEventListener('click', registerUser);
document.getElementById('deleteUser').addEventListener('click', deleteUser);
document.getElementById('editUser').addEventListener('click', editUser);
document.getElementById('viewSoftwareVersions').addEventListener('click', viewSoftwareVersions);

function viewSystemOwners() {
    db.all('SELECT * FROM system_owners', [], (err, rows) => {
      if (err) {
        throw err;
      }
  
      const mainContent = document.querySelector('.main');
      let output = '<h2>System Owners</h2><ul>';
  
      rows.forEach((row) => {
        output += `<li>ID: ${row.id}, Name: ${row.name}, Email: ${row.email}, Department: ${row.department}</li>`;
      });
  
      output += '</ul>';
      mainContent.innerHTML = output;
    });
  }
  function viewAllSoftware() {
    db.all('SELECT * FROM software', [], (err, rows) => {
      if (err) {
        throw err;
      }
  
      const mainContent = document.querySelector('.main');
      let output = '<h2>All Software</h2><ul>';
  
      rows.forEach((row) => {
        output += `<li>ID: ${row.id}, Name: ${row.name}, Description: ${row.description}</li>`;
      });
  
      output += '</ul>';
      mainContent.innerHTML = output;
    });
  }
  

// Assign software
function assignSoftware() {
    db.all('SELECT * FROM system_owners', [], (err, users) => {
      if (err) {
        throw err;
      }
  
      db.all('SELECT * FROM software', [], (err, software) => {
        if (err) {
          throw err;
        }
  
        const mainContent = document.querySelector('.main');
        let output = '<h2>Assign Software</h2>';
  
        output += `
          <form id="assignSoftwareForm">
            <label for="user">User:</label>
            <select name="user" id="userSelect">
              ${users.map((user) => `<option value="${user.id}">${user.name}</option>`).join('')}
            </select>
            <label for="software">Software:</label>
            <select name="software" id="softwareSelect">
              ${software.map((sw) => `<option value="${sw.id}">${sw.name}</option>`).join('')}
            </select>
            <button type="submit">Assign</button>
          </form>
        `;
  
        mainContent.innerHTML = output;
  
        document.getElementById('assignSoftwareForm').addEventListener('submit', (event) => {
          event.preventDefault();
  
          const userId = document.getElementById('userSelect').value;
          const softwareId = document.getElementById('softwareSelect').value;
  
          db.run('INSERT INTO software_assignments(user_id, software_id) VALUES(?, ?)', [userId, softwareId], (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Software assignment created successfully!');
            // Do something upon successful assignment (e.g., display a success message or reload the page)
          });
        });
      });
    });
  }

  function removeSoftware() {
    const query = `
      SELECT software_assignments.id as assignment_id, system_owners.name as user_name, software.name as software_name
      FROM software_assignments
      JOIN system_owners ON software_assignments.user_id = system_owners.id
      JOIN software ON software_assignments.software_id = software.id
    `;
  
    db.all(query, [], (err, assignments) => {
      if (err) {
        throw err;
      }
  
      const mainContent = document.querySelector('.main');
      let output = '<h2>Remove Software</h2>';
  
      output += '<ul id="assignmentList">';
      assignments.forEach((assignment) => {
        output += `
          <li>
            <span>${assignment.user_name} - ${assignment.software_name}</span>
            <button class="removeButton" data-assignment-id="${assignment.assignment_id}">Remove</button>
          </li>
        `;
      });
      output += '</ul>';
  
      mainContent.innerHTML = output;
  
      document.querySelectorAll('.removeButton').forEach((button) => {
        button.addEventListener('click', (event) => {
          const assignmentId = event.target.getAttribute('data-assignment-id');
  
          db.run('DELETE FROM software_assignments WHERE id = ?', [assignmentId], (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Software assignment removed successfully!');
            // Refresh the assignment list or do something upon successful removal
            removeSoftware();
          });
        });
      });
    });
  }
  function addSoftware() {
    const mainContent = document.querySelector('.main');
    let output = '<h2>Add Software</h2>';
  
    output += `
      <form id="addSoftwareForm">
        <label for="softwareName">Software Name:</label>
        <input type="text" name="softwareName" id="softwareName" required>
        <label for="softwareVersion">Software Version:</label>
        <input type="text" name="softwareVersion" id="softwareVersion" required>
        <button type="submit">Add</button>
      </form>
    `;
  
    mainContent.innerHTML = output;
  
    document.getElementById('addSoftwareForm').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const softwareName = document.getElementById('softwareName').value;
      const softwareVersion = document.getElementById('softwareVersion').value;
  
      db.run('INSERT INTO software(name, version) VALUES(?, ?)', [softwareName, softwareVersion], (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('New software added successfully!');
        // Do something upon successful addition (e.g., display a success message or reload the page)
      });
    });
  }
*/
  function registerUser() {
    db.run(
        'INSERT INTO users(name, email, password, department, isAdmin) VALUES(?, ?, ?, ?, ?)',
        [userName, userEmail, userPassword, userDepartment, isAdmin],
        function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Rows inserted ${this.changes}`);
        }
      );
    const mainContent = document.querySelector('.main');
    let output = '<h2>Register User</h2>';
  
    output += `
      <form id="registerUserForm">
        <label for="userName">Name:</label>
        <input type="text" name="userName" id="userName" required>
        <label for="userEmail">Email:</label>
        <input type="email" name="userEmail" id="userEmail" required>
        <label for="userPassword">Password:</label>
        <input type="password" name="userPassword" id="userPassword" required>
        <label for="userDepartment">Department:</label>
        <input type="text" name="userDepartment" id="userDepartment" required>
        <label for="isAdmin">Admin:</label>
        <select name="isAdmin" id="isAdmin">
          <option value="0">System Owner</option>
          <option value="1">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    `;
  
    mainContent.innerHTML = output;
  
    document.getElementById('registerUserForm').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const userName = document.getElementById('userName').value;
      const userEmail = document.getElementById('userEmail').value;
      const userPassword = document.getElementById('userPassword').value;
      const userDepartment = document.getElementById('userDepartment').value;
      const isAdmin = document.getElementById('isAdmin').value;
  
      db.run(
        'INSERT INTO users(name, email, password, department, isAdmin) VALUES(?, ?, ?, ?, ?)',
        [userName, userEmail, userPassword, userDepartment, isAdmin],
        (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('New user registered successfully!');
          // Do something upon successful registration (e.g., display a success message or navigate to another page)
        }
      );
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const registerUserButton = document.getElementById('registerUserButton');
    if (registerUserButton) {
      registerUserButton.addEventListener('click', registerUser);
    }
  });
  function deleteUser() {
    const mainContent = document.querySelector('.main');
    let output = '<h2>Delete User</h2>';
  
    output += '<div id="userList"></div>';
    mainContent.innerHTML = output;
  
    updateUserList();
  }
  
  function updateUserList() {
    const userList = document.getElementById('userList');
  
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
  
      let output = '<ul>';
      rows.forEach((row) => {
        output += `
          <li>
            ${row.name} (${row.email})
            <button onclick="deleteUserById(${row.id})">Delete</button>
          </li>
        `;
      });
      output += '</ul>';
      userList.innerHTML = output;
    });
  }
  function deleteUserById(id) {
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`User with id ${id} deleted successfully!`);
      updateUserList();
    });
  }

  function editUser() {
    const mainContent = document.querySelector('.main');
    let output = '<h2>Edit User</h2>';
  
    output += '<div id="userList"></div>';
    mainContent.innerHTML = output;
  
    updateUserListForEditing();
  }
  
  function updateUserListForEditing() {
    const userList = document.getElementById('userList');
  
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
  
      let output = '<ul>';
      rows.forEach((row) => {
        output += `
          <li>
            ${row.name} (${row.email})
            <button onclick="editUserById(${row.id})">Edit</button>
          </li>
        `;
      });
      output += '</ul>';
      userList.innerHTML = output;
    });
  }
  
  function editUserById(id) {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
  
      const mainContent = document.querySelector('.main');
      let output = `<h2>Edit User: ${row.name}</h2>`;
  
      output += `
        <form onsubmit="updateUser(${row.id}); return false;">
          <label for="name">Name:</label>
          <input type="text" id="name" value="${row.name}" required>
          <br>
          <label for="email">Email:</label>
          <input type="email" id="email" value="${row.email}" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" id="password" value="${row.password}" required>
          <br>
          <label for="isAdmin">Admin:</label>
          <select id="isAdmin">
            <option value="yes" ${row.isAdmin === 'yes' ? 'selected' : ''}>Yes</option>
            <option value="no" ${row.isAdmin === 'no' ? 'selected' : ''}>No</option>
          </select>
          <br>
          <input type="submit" value="Update User">
        </form>
      `;
      mainContent.innerHTML = output;
    });
  }
  
  function updateUser(id) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('isAdmin').value;
  
    db.run(
      'UPDATE users SET name = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?',
      [name, email, password, isAdmin, id],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`User with id ${id} updated successfully!`);
        editUser(); // Refresh the user list
      }
    );
  }

function viewSoftwareVersions() {
  const mainContent = document.querySelector('.main');
  let output = '<h2>Software Versions</h2>';

  output += '<div id="softwareList"></div>';
  mainContent.innerHTML = output;

  updateSoftwareList();
}

function updateSoftwareList() {
  const softwareList = document.getElementById('softwareList');

  db.all('SELECT * FROM software', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    let output = '<ul>';
    rows.forEach((row) => {
      output += `
        <li>
          ${row.name} (Version: ${row.version})
        </li>
      `;
    });
    output += '</ul>';
    softwareList.innerHTML = output;
  });
}