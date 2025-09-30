
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").style.display = "inline";
    isValid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // Password match validation
  if (password !== confirmPassword) {
    document.getElementById("passError").style.display = "inline";
    isValid = false;
  } else {
    document.getElementById("passError").style.display = "none";
  }

  // Name check
  if (name.length < 3) {
    alert("Name must be at least 3 characters long.");
    isValid = false;
  }

  // Phone check
  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number must be 10 digits.");
    isValid = false;
  }

  return isValid;
}

// ✅ Handle register form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const dob = document.getElementById("dob").value;
  const city = document.getElementById("city").value;

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, pass, confirmPass, gender, dob, city })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅", data.message);

      // Save email and go to profile
      localStorage.setItem("userEmail", email);
      window.location.href = "/profile.html";
    } else {
      const error = await response.json();
      alert("❌ " + error.message);
    }
  } catch (err) {
    console.error("Register error:", err);
    alert("⚠ Error: " + err.message);
  }
});
