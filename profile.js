document.addEventListener("DOMContentLoaded", () => {
  
  const q = (id) => {
    const el = document.getElementById(id);
    if (!el) console.warn(`[profile] Missing element: #${id}`);
    return el;
  };

  const overlays = {
    profile: q("profile-overlay"),
    donate: q("donate-overlay"),
    receive: q("receive-overlay"),
  };

  function hideAllOverlays() {
    Object.values(overlays).forEach((el) => {
      if (el) el.style.display = "none";
    });
  }

  function showOverlay(which) {
    hideAllOverlays();
    const el = overlays[which];
    if (el) el.style.display = "flex";
  }

 
  const profileBtn = q("profile-btn");
  const closeBtn = q("close-btn");

  if (profileBtn) {
    profileBtn.addEventListener("click", () => showOverlay("profile"));
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", hideAllOverlays);
  }

 
  const editBtn = q("edit-btn");
  const saveBtn = q("save-btn");
  const cancelBtn = q("cancel-btn");

  const usernameDisplay = q("username-display");
  const usernameInput = q("username-input");
  const emailDisplay = q("email-display");
  const emailInput = q("email-input");
  const mobileDisplay = q("mobile-display");
  const mobileInput = q("mobile-input");

  function setEditMode(on) {
    if (!usernameDisplay || !emailDisplay || !mobileDisplay) return;
    if (!usernameInput || !emailInput || !mobileInput) return;

    if (on) {
      
      usernameInput.value = usernameDisplay.textContent || "";
      emailInput.value = emailDisplay.textContent || "";
      mobileInput.value = mobileDisplay.textContent || "";

      usernameDisplay.style.display = "none";
      emailDisplay.style.display = "none";
      mobileDisplay.style.display = "none";

      usernameInput.style.display = "block";
      emailInput.style.display = "block";
      mobileInput.style.display = "block";

      if (editBtn) editBtn.style.display = "none";
      if (saveBtn) saveBtn.style.display = "inline-block";
      if (cancelBtn) cancelBtn.style.display = "inline-block";
    } else {
      usernameDisplay.style.display = "inline";
      emailDisplay.style.display = "inline";
      mobileDisplay.style.display = "inline";

      usernameInput.style.display = "none";
      emailInput.style.display = "none";
      mobileInput.style.display = "none";

      if (editBtn) editBtn.style.display = "inline-block";
      if (saveBtn) saveBtn.style.display = "none";
      if (cancelBtn) cancelBtn.style.display = "none";
    }
  }

  if (editBtn) editBtn.addEventListener("click", () => setEditMode(true));

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (usernameDisplay && usernameInput)
        usernameDisplay.textContent = usernameInput.value.trim();
      if (emailDisplay && emailInput)
        emailDisplay.textContent = emailInput.value.trim();
      if (mobileDisplay && mobileInput)
        mobileDisplay.textContent = mobileInput.value.trim();
      setEditMode(false);
    });
  }

  if (cancelBtn) cancelBtn.addEventListener("click", () => setEditMode(false));

  const donorBtn = q("donor-btn");
  const receiveBtn = q("receive-btn");
  const donateClose = q("donate-close");
  const receiveClose = q("receive-close");

  if (donorBtn) {
    donorBtn.addEventListener("click", () => showOverlay("donate"));
  }
  if (receiveBtn) {
    receiveBtn.addEventListener("click", () => showOverlay("receive"));
  }
  if (donateClose) {
    donateClose.addEventListener("click", () => showOverlay("profile"));
  }
  if (receiveClose) {
    receiveClose.addEventListener("click", () => showOverlay("profile"));
  }


  const donateForm = q("donate-form");
  const receiveForm = q("receive-form");

  if (donateForm) {
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Donation form submitted successfully!");
      showOverlay("profile"); 
    });
  }

  if (receiveForm) {
    receiveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Receiver form submitted successfully!");
      showOverlay("profile");
    });
  }

 
  

  hideAllOverlays(); 
});

function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle("hidden");
}

// Example validation for donation form
function validateDonateForm() {
  const phone = document.getElementById("phone").value;
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
  }
  return true;
}
function toggleOrganListMain() {
  const organList = document.getElementById("organListMain");
  organList.style.display = document.getElementById("donateOrganMain").checked
    ? "block"
    : "none";
}

function validateFormMain() {
  const email = document.getElementById("emailMain").value;
  if (!email.includes("@")) {
    alert("Enter a valid email in main form");
    return false;
  }
  return true;
}

 function openModal() {
      document.getElementById("donateModal").style.display = "flex";
    }

    function closeModal() {
      document.getElementById("donateModal").style.display = "none";
    }

    // Close modal if clicking outside the box
    window.onclick = function(event) {
      let modal = document.getElementById("donateModal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
    function openDonatemodal() {
  document.getElementById("donateModal2").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeDonatemodal() {
  document.getElementById("donateModal2").style.display = "none";
  document.body.style.overflow = "auto";
}

window.onclick = function(event) {
  let modal2 = document.getElementById("donateModal2");
  if (event.target === modal2) {
    modal2.style.display = "none";
  }
}
function openReceiveModal() {
  document.getElementById("receiveModal2").style.display = "flex";
  document.body.style.overflow = "hidden"; // stop background scroll
}

function closeReceiveModal() {
  document.getElementById("receiveModal2").style.display = "none";
  document.body.style.overflow = "auto"; // restore background scroll
}

// Close if clicking outside modal content
window.addEventListener("click", function(event) {
  let modal2 = document.getElementById("receiveModal2");
  if (event.target === modal2) {
    closeReceiveModal();
  }
});
function toggleOrganListreceive() {
    const checkbox = document.getElementById("receiveorgan");
    const organList = document.getElementById("organListreceive");
    organList.style.display = checkbox.checked ? "block" : "none";
  }
  function toggleBloodListreceive() {
  const checkbox = document.getElementById("receiveblood"); // correct ID for blood checkbox
  const bloodGroupDiv = document.getElementById("bloodGroupSectionReceive");

  if (checkbox.checked) {
    bloodGroupDiv.style.display = "block";  // Show when checked
  } else {
    bloodGroupDiv.style.display = "none";   // Hide when unchecked
  }
}
 function toggleOrganListMain2() {
  const checkbox = document.getElementById("donateOrganMain2");
  const organList = document.getElementById("organListMain2");

  if (checkbox.checked) {
    organList.style.display = "block";
  } else {
    organList.style.display = "none";

    // optional: uncheck all organ checkboxes when hidden
    const organs = organList.querySelectorAll("input[type='checkbox']");
    organs.forEach(org => org.checked = false);
  }
}

 console.log("✅ profile.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return; // nothing saved

  const user = JSON.parse(userStr);

  // Update UI
  if (user.name && document.getElementById("username-display")) {
    document.getElementById("username-display").textContent = user.name;
  }
  if (user.email && document.getElementById("email-display")) {
    document.getElementById("email-display").textContent = user.email;
  }
  if (user.phone && document.getElementById("mobile-display")) {
    document.getElementById("mobile-display").textContent = user.phone;
  }
});




// Example: called when clicking "Inbox" button
//document.getElementById("inboxBtn").addEventListener("click", loadInbox);

function toggleOrganList() {
  const checkbox = document.getElementById("donateOrganCheckbox");
  const organList = document.getElementById("organList");
  organList.style.display = checkbox.checked ? "block" : "none";
}

function toggleBloodListreceive() {
  const checkbox = document.getElementById("receiveblood");
  const div = document.getElementById("bloodGroupSectionReceive");
  div.style.display = checkbox.checked ? "block" : "none";
}


// Optional: attach event listener instead of inline onclick
document.getElementById("receiveblood")?.addEventListener("change", toggleBloodListreceive);


function toggleOrganListreceive() {
  const checkbox = document.getElementById("receiveorgan");
  const organList = document.getElementById("organListreceive");
  organList.style.display = checkbox.checked ? "block" : "none";
}

// For checkbox with ID "receiveblood" (first form)
function toggleBloodListReceiveMain() {
  const checkbox = document.getElementById("receiveblood");
  const div = document.getElementById("bloodGroupSectionReceive1");
  if (checkbox && div) {
    div.style.display = checkbox.checked ? "block" : "none";
  }
}
document.getElementById("receiveblood")?.addEventListener("change", toggleBloodListReceiveMain);

// For checkbox with ID "receiveblood1" (second form)
function toggleBloodListReceiveSecondary() {
  const checkbox = document.getElementById("receiveblood1");
  const div = document.getElementById("bloodGroupSection");
  if (checkbox && div) {
    div.style.display = checkbox.checked ? "block" : "none";
  }
}
document.getElementById("receiveblood1")?.addEventListener("change", toggleBloodListReceiveSecondary);
function toggleOrganList() {
  const checkbox = document.getElementById("donateOrganCheckbox"); // checkbox ID
  const organList = document.getElementById("organList");          // div ID to show/hide
  if (checkbox && organList) {
    organList.style.display = checkbox.checked ? "block" : "none";
  }
}

// Optional: attach event listener instead of using inline onclick
document.getElementById("donateOrganCheckbox")?.addEventListener("change", toggleOrganList);
function toggleOrganListMain() {
  const checkbox = document.getElementById("donateOrganMainCheckbox");
  const organList = document.getElementById("organListMain");
  if (checkbox && organList) {
    organList.style.display = checkbox.checked ? "block" : "none";
  }
}

// Attach listener
document.getElementById("donateOrganMainCheckbox")?.addEventListener("change", toggleOrganListMain);
function toggleOrganList() {
  const checkbox = document.getElementById("donateOrganCheckbox"); // checkbox ID
  const organList = document.getElementById("organList");          // div ID to show/hide
  if (checkbox && organList) {
    organList.style.display = checkbox.checked ? "block" : "none";
  }
}

// Attach listener so it works when the checkbox is changed
document.getElementById("donateOrganCheckbox")?.addEventListener("change", toggleOrganList);
function toggleOrganListOverlay() {
  const checkbox = document.getElementById("donateOrganOverlayCheckbox");
  const organList = document.getElementById("organListOverlay");
  if (checkbox && organList) {
    organList.style.display = checkbox.checked ? "block" : "none";
  }
}

// Attach event listener
document.getElementById("donateOrganOverlayCheckbox")?.addEventListener("change", toggleOrganListOverlay);
// ------------------ Receiver Form 1 ------------------
// inbox.js

// Utility to get donor email from URL
// inbox.js

// Get donor email from stored user object
// ------------------ Inbox Function ------------------
async function loadInbox() {
  const inboxDiv = document.getElementById("inboxMessages");
  inboxDiv.innerHTML = "Loading messages...";

  // Get logged-in user info from localStorage
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

    // Clear inbox container
    inboxDiv.innerHTML = "";

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
    inboxDiv.scrollTop = inboxDiv.scrollHeight;

  } catch (err) {
    console.error("Error loading inbox:", err);
    inboxDiv.innerHTML = `<p>Error loading inbox: ${err.message}</p>`;
  }
}

