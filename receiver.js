async function getUsers() {
      const res = await fetch("/users");
      const users = await res.json();
      document.getElementById("userList").innerHTML =
        users.map(u => `<li>${u.name} - ${u.email}</li>`).join("");
    }


    app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Server error");
    }

    if (result.length === 0) {
      return res.status(400).send("❌ User not found");
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      res.send("✅ Login successful! Go to /dashboard");
    } else {
      res.status(400).send("❌ Wrong password");
    }
  });
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("❌ Error registering user");
        }
        res.send("✅ Registered successfully! You can now login.");
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});
