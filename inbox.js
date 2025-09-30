async function loadInbox() {
  const inboxDiv = document.getElementById("inboxMessages");

  // Get logged-in user info
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    inboxDiv.innerHTML = "User not logged in.";
    return;
  }

  const user = JSON.parse(userStr);
  const donorEmail = user.email;
  if (!donorEmail) {
    inboxDiv.innerHTML = "No email found for logged-in user.";
    return;
  }

  try {
    const response = await fetch(`/api/inbox?email=${encodeURIComponent(donorEmail)}`);
    if (!response.ok) throw new Error("Failed to fetch inbox messages.");

    const messages = await response.json();

    if (messages.length === 0) {
      inboxDiv.innerHTML = "<p>No messages in your inbox.</p>";
      return;
    }

    inboxDiv.innerHTML = ""; // clear old content

    const list = document.createElement("ul");
    list.className = "inbox-list";

    messages.forEach(msg => {
      const li = document.createElement("li");
      li.className = "inbox-message";
      const date = new Date(msg.sent_at).toLocaleString();

      li.innerHTML = `
        <strong>From:</strong> ${msg.receiver_email} <br>
        <strong>Date:</strong> ${date} <br>
        <strong>Message:</strong> ${msg.message}
      `;
      list.appendChild(li);
    });

    inboxDiv.appendChild(list);

    // Scroll to bottom
    inboxDiv.scrollTop = inboxDiv.scrollHeight;

  } catch (err) {
    console.error("Error loading inbox:", err);
    inboxDiv.innerHTML = `<p>Error loading inbox: ${err.message}</p>`;
  }
}

// Call loadInbox when page loads
document.addEventListener("DOMContentLoaded", loadInbox);
