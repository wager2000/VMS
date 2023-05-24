//Tilføj bruger
const button = document.getElementById("submit1");
button.onclick = function (e) {
  e.preventDefault();
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const userDepartment = document.getElementById("userDepartment").value;
  const isAdmin = document.getElementById("isAdmin").value;

  fetch("http://localhost:8200/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      console.error("Error:", error);
    });
};

//Tildel software/system til bruger
const button2 = document.getElementById("submit2");
button2.onclick = function (e) {
  e.preventDefault();
  const softwareName = document.getElementById("nameOfSoftware").value;
  const Email = document.getElementById("assignEmail").value;
  console.log(softwareName);
  console.log(`Assigning ${softwareName} to ${Email}`); // Log the inputs

  fetch("/assignSoftware", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      softwareName: softwareName,
      Email: Email,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the server response
      if (data.success) {
        alert("Software assigned successfully!");
      } else {
        alert("Failed to assign software. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

