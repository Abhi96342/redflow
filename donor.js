
// Handle form submission
document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent real submit
  alert("Form submitted successfully! (Demo only)");
});

// Toggle Organ List on checkbox click
function toggleOrganList() {
    const checkbox = document.getElementById("donateOrgan");
    const organList = document.getElementById("organList");
    organList.style.display = checkbox.checked ? "block" : "none";
  }
  function toggleBloodList() {
  const checkbox = document.getElementById("donateorgan");
  const bloodGroupDiv = document.getElementById("bloodGroupSection");

  if (checkbox.checked) {
    bloodGroupDiv.style.display = "block";  // Show when checked
  } else {
    bloodGroupDiv.style.display = "none";   // Hide when unchecked
  }
}
async function getUsers() {
      const res = await fetch("/users");
      const users = await res.json();
      document.getElementById("userList").innerHTML =
        users.map(u => `<li>${u.name} - ${u.email}</li>`).join("");
    }