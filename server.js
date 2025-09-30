const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
// Parse URL-encoded form posts and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ✅ SQL Server config
const dbConfig = {
  user: "use",            // your SQL Server username
  password: "123",        // your SQL Server password
  server: "localhost",
  port: 1433,
  database: "redflow",
  options: {
    trustServerCertificate: true,
    instanceName: "SQLEXPRESS"
  },
};

// ✅ Connect to SQL Server once
let poolPromise = sql.connect(dbConfig).then(pool => {
  console.log("✅ Connected to SQL Server");
  return pool;
}).catch(err => {
  console.error("❌ Database connection failed:", err);
});

// ✅ Serve static files
app.use(express.static(path.join(__dirname)));

// ✅ Root route (main.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

// ✅ Register route
app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, pass, confirmPass, gender, dob, city } = req.body;
    const pool = await poolPromise;
     const check=await pool.request()
     .input("email", sql.VarChar, email)
     .query(`SELECT * FROM dbo.users WHERE email = @email`);
      if(check.recordset.length>0){
        return res.status(400).send("❌ Email already registered");
      }

    if (pass !== confirmPass) {
      return res.status(400).send("❌ Passwords do not match");
    }

    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("phone", sql.VarChar, phone)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, pass)  // ⚠ plain text (hash in production)
      .input("gender", sql.VarChar, gender)
      .input("dob", sql.Date, dob)
      .input("city", sql.NVarChar, city)
      .query(`
        INSERT INTO dbo.users (name, phone, email, password, gender, dob, city)
        VALUES (@name, @phone, @email, @password, @gender, @dob, @city)
      `);
    //res.sendFile(path.join(__dirname, "profile.html"));
   // REGISTER route fixed
   res.sendFile(path.join(__dirname, "profile.html"));
//res.status(200).json({ message: "Registration successful" });


   
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send("Server error during registration.");
  }
});


// app.post("/register", async (req, res) => {
//   console.log(req.body); // <-- test
//   res.send("OK");
// });


// ✅ Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;

    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT * FROM dbo.users
        WHERE email = @email AND password = @password
      `);

    if (result.recordset.length > 0) {
      //res.sendFile(path.join(__dirname, "profile.html"));
      res.json(result.recordset[0]); // send user data as JSON
    } else {
      res.status(401).json({ message: "❌ Invalid email or password" });
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});
app.post("/donate", async (req, res) => {
  try {
    const { cName, phone, email, gender, bloodGroup, lastdonated, address, organs } = req.body;

    const organString = Array.isArray(organs) ? organs.join(",") : organs || null;

    const pool = await poolPromise;

    await pool.request()
      .input("cName", sql.VarChar, cName)
      .input("phone", sql.VarChar, phone)
      .input("email", sql.VarChar, email)
      .input("gender", sql.VarChar, gender)
      .input("blood", sql.VarChar, bloodGroup)  
      .input("lastdonated", sql.Date, lastdonated || null)
      .input("address", sql.NVarChar, address)
      .input("organ", sql.NVarChar, organString)
      .query(`
        INSERT INTO dbo.donor (cname, phone, email, organ, gender, blood, address, lastdonated)
        VALUES (@cName, @phone, @email, @organ, @gender, @blood, @address, @lastdonated)
      `);

    // res.send("✅ Donor saved successfully!");
    res.sendFile(path.join(__dirname, "profile.html"));
  } catch (err) {
    console.error("❌ Donor save error:", err);
    res.status(500).send("Server error while saving donor: " + err.message);
  }
});








// ✅ Receiver form submission
app.post("/receive", async (req, res) => {
  try {
    const {
      Name,
      gender,
      bloodgroup,
      residential,
      phoneMobile,
      phone,
      email,
      hospitalName,
      hospitalLocation,
      requestDateTime,
      Date,
      doctor,
      organs,
      reason,
      needblood,
    } = req.body;
//const bloodValue = String(bloodgroup || '').trim();

    //const needBlood = req.body.bloodgroup || null;
    const needOrgan = Array.isArray(organs) ? organs.join(",") : organs;
if (!email) {    return res.status(400).send("Email and Blood Group are required");
}

    const pool = await poolPromise;

    await pool.request()
      .input("cName", sql.NVarChar, Name)
      .input("phone", sql.VarChar, phoneMobile || phone)
      .input("email", sql.VarChar, email)
      .input("gender", sql.VarChar, gender)
      .input("blood", sql.VarChar, bloodgroup)
      .input("address", sql.NVarChar, residential)
      .input("hospital", sql.NVarChar, hospitalName)
      .input("location", sql.NVarChar, hospitalLocation)
      .input("datentime", sql.DateTime, requestDateTime || Date)
      .input("doctor", sql.NVarChar, doctor)
      .input("needblood", sql.VarChar, needblood)
      .input("needorgan", sql.NVarChar, needOrgan)
      .input("reason", sql.NVarChar, reason)
      .query(`
        INSERT INTO dbo.receiver
        (cName, phone, email, gender, blood, address, hospital, location, datentime, doctor,needblood, needorgan, reason)
        VALUES (@cName, @phone, @email, @gender, @blood, @address, @hospital, @location, @datentime, @doctor,@needblood, @needorgan, @reason)
      `);
 // console.log("Received bloodgroup:",needblood, "Type:", typeof needblood); 

  res.redirect(`/matches.html?email=${encodeURIComponent(email)}`);
//res.redirect(`/matches.html?email=${encodeURIComponent(email)}&needblood=${encodeURIComponent(needblood)}&needorgan=${encodeURIComponent(needOrgan)}`);

  } catch (err) {
    console.error("❌ Receiver save error:", err);
    res.status(500).send("Server error while saving receiver: " + err.message);
  }
});
app.get("/api/matches", async (req, res) => {
  try {
    const receiverEmail = req.query.email; // read email from query

    if (!receiverEmail) {
      return res.status(400).json({ error: "Receiver email is required" });
    }
//console.log("Email received in API:", req.query.email);

    const pool = await poolPromise;

    // Select donors matching this receiver's blood or organ needs
    const result = await pool.request()
      .input("email", sql.VarChar, receiverEmail)
      .query(`
  SELECT 
    d.cName AS donor_name,
    d.blood AS donor_blood,
    d.organ AS donor_organ,
    d.phone AS donor_contact,
    d.email AS donor_email,
    r.cName AS receiver_name,
    r.needblood AS receiver_blood,
    r.needorgan AS receiver_organ,
    r.phone AS receiver_contact,
    CASE                             -- Determine the type of match
            WHEN d.blood = r.needblood AND d.organ LIKE '%' + r.needorgan + '%' THEN 'Both Blood & Organ'
            WHEN d.blood = r.needblood THEN 'Blood Match Only'
            WHEN d.organ LIKE '%' + r.needorgan + '%' THEN 'Organ Match Only'
            ELSE 'Partial Match'
          END AS match_type
  FROM dbo.donor d
  JOIN dbo.receiver r
    ON r.email = @email 
  WHERE d.blood = r.needblood or d.organ like '%' + r.needorgan + '%'
  ORDER BY donor_name
`);
   // console.log("SQL Result:", result.recordset);

    res.json(result.recordset);

  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/send-request", async (req, res) => {
  try {
    const { donorEmail, receiverEmail, receiverName } = req.body;

    if (!donorEmail || !receiverEmail) {
      return res.status(400).send("Missing donor or receiver email.");
    }

    const pool = await poolPromise;

    // Fetch receiver's date/time and phone
    const receiverResult = await pool.request()
      .input("receiverEmail", sql.VarChar, receiverEmail)
      .query(`SELECT datentime, phone FROM dbo.receiver WHERE email = @receiverEmail`);

    if (receiverResult.recordset.length === 0) {
      return res.status(404).send("Receiver not found.");
    }

    const { datentime, phone } = receiverResult.recordset[0];

    // Construct message using correct variables
    const message = `${receiverName} wants to contact you regarding blood/organ donation.\n` +
                    `Requested on: ${new Date(datentime).toLocaleString()}\n` +
                    `Contact number: ${phone}`;

    // Insert into messages table
    await pool.request()
      .input("donorEmail", sql.VarChar, donorEmail)
      .input("receiverEmail", sql.VarChar, receiverEmail)
      .input("message", sql.NVarChar, message)
      .input("sentAt", sql.DateTime, datentime)
      .query(`
        INSERT INTO dbo.messages (donor_email, receiver_email, message, sent_at)
        VALUES (@donorEmail, @receiverEmail, @message, @sentAt)
      `);

    res.status(200).send("✅ Request sent successfully and saved in messages table!");

  } catch (err) {
    console.error("Error sending request:", err);
    res.status(500).send("Server error while sending request.");
  }
});




// Get donor inbox messages
// GET /api/donor/messages?email=donor@example.com
app.get("/api/inbox", async (req, res) => {
  try {
    const donorEmail = req.query.email;
    if (!donorEmail) return res.status(400).json({ error: "Donor email required" });

    const pool = await poolPromise;
    const result = await pool.request()
      .input("donorEmail", sql.VarChar, donorEmail)
      .query(`
        SELECT id, receiver_email, message, sent_at
        FROM dbo.messages
        WHERE donor_email = @donorEmail
        ORDER BY sent_at DESC
      `);

    res.json(result.recordset);

  } catch (err) {
    console.error("Error fetching donor messages:", err);
    res.status(500).json({ error: err.message });
  }
});



// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});