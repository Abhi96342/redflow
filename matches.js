
// ------------------ Request Button ------------------
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("request-btn")) return;

  const button = e.target;
  const donorEmail = button.getAttribute("data-donor-email");
  const receiverEmail = getEmailFromURL();

  if (!donorEmail || !receiverEmail) {
    alert("Missing donor or receiver email.");
    return;
  }

  const row = button.closest("tr");
  const receiverName = row ? row.cells[4].textContent : "Receiver";

  try {
    const response = await fetch("/api/send-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        donorEmail,
        receiverEmail,
        receiverName
      })
    });

    if (response.ok) {
      alert("✅ Request sent successfully to donor!");
      button.disabled = true;
      button.textContent = "Request Sent";
    } else {
      const errorText = await response.text();
      alert(`❌ Failed to send request: ${errorText}`);
    }
  } catch (err) {
    console.error("Error sending request:", err);
    alert("❌ Error sending request.");
  }
});

// ------------------ Helper to get email from URL ------------------
function getEmailFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("email");
}

// ------------------ Load matches when page loads ------------------
window.addEventListener("DOMContentLoaded", async () => {
  const email = getEmailFromURL();
  if (!email) return alert("No receiver email found");

  try {
    const response = await fetch(`/api/matches?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error("Failed to fetch matches");

    const matches = await response.json();

    const tbody = document.querySelector("#matchTable tbody");
    if (!tbody) return console.error("Table body not found.");

    tbody.innerHTML = "";

    if (matches.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">No matches found</td></tr>`;
      return;
    }

    matches.forEach(match => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${match.donor_name}</td>
        <td>${match.donor_blood}</td>
        <td>${match.donor_organ || "-"}</td>
        <td>${match.donor_contact}</td>
        <td>${match.receiver_name}</td>
        <td>${match.receiver_blood || "-"}</td>
        <td>${match.receiver_organ || "-"}</td>
        <td>${match.match_type}</td>
        <td>
         <button class="request-btn" data-donor-email="${match.donor_email}">
            Request Contact
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

  } catch (err) {
    console.error("Error loading matches:", err);
    alert("Error loading matches: " + err.message);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return; // no user info

  const user = JSON.parse(userStr);
  const navUsername = document.getElementById("nav-username");
  if (navUsername && user.name) {
    navUsername.textContent = user.name; // replace "John Doe" with stored name
  }
});