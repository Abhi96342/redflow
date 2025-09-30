async function getUsers() {
      const res = await fetch("/users");
      const users = await res.json();
      document.getElementById("userList").innerHTML =
        users.map(u => `<li>${u.name} - ${u.email}</li>`).join("");
    }



console.log("✅ login.js loaded");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // ⛔ stop normal form submit

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const user = await response.json();

      // ✅ Save user to sessionStorage (clears on browser close)
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Stored user in sessionStorage:", user);

      // ✅ Redirect to profile page
      window.location.href = "/profile.html";
    } else {
      let errorMsg = "Login failed";
      try {
        const error = await response.json();
        errorMsg = error.message || errorMsg;
      } catch {}
      alert(errorMsg);
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    alert("Server error, please try again.");
  }
});
