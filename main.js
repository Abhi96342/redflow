// Open login overlay
const modelBtn = document.getElementById("model");
const loginOverlay = document.getElementById("loginOverlay");

modelBtn.addEventListener("click", () => {
  loginOverlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // Stop background scrolling
});

// Close overlay
function closePopup(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Switch between login and signup overlays
function switchPopup(closeId, openId) {
  document.getElementById(closeId).style.display = "none";
  document.getElementById(openId).style.display = "flex";
  document.body.style.overflow = "hidden"; // Keep background scrolling disabled
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const user = await response.json();

      // Save only necessary data in localStorage
      localStorage.setItem("user", JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone
      }));

      // Redirect to profile page
      window.location.href = "profile.html";
    } else {
      const error = await response.json();
      alert(error.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Try again later.");
  }
});

    // Server sends profile.html directly, browser navigates automatically
    

// ---------------- REGISTER ----------------
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateRegisterForm()) return;

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const text = await response.text();
      alert(text);
      return;
    }

    const html = await response.text();
    document.open();
    document.write(html);
    document.close();

  } catch (err) {
    console.error("Registration error:", err);
    alert("Server error. Try again later.");
  }
});
// ---------------- VALIDATION ----------------
function validateRegisterForm() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("emailRegister").value.trim();
  const pass = document.getElementById("passwordRegister").value;
  const confirmPass = document.getElementById("confirmPasswordRegister").value;

  if (!name || !phone || !email || !pass || !confirmPass) {
    alert("All fields are required.");
    return false;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Phone must be 10 digits.");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match.");
    return false;
  }

  return true;
}
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      document.getElementById("name-display").textContent = user.name || "-";
      document.getElementById("email-display").textContent = user.email || "-";
      document.getElementById("mobile-display").textContent = user.phone || "-";
    } else {
      alert("No user data found. Please login first.");
      window.location.href = "main.html"; // redirect to login page}
    }});