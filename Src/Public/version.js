//Opret ticket
const button = document.getElementById("button");
button.onclick = function (e) {
  e.preventDefault();
  const softwareName = document.getElementById("softwareName").value;
  const version = document.getElementById("version").value;
  const details = document.getElementById("Details").value;
  const date = document.getElementById("date").value;

  console.log(version);

  console.log(softwareName, version, Details, date);

  fetch("http://localhost:8200/updateVersion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      softwareName,
      version,
      details,
      date,
    }),
  })
    .then((response) => response.text())
    .then((message) => {
      window.alert("Ticket created!");
      window.location = "./version.html";
      console.log(message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
