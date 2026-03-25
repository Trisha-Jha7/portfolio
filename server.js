const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

/* MIDDLEWARE */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* SERVE FRONTEND */
app.use(express.static(__dirname));

/* DATABASE CONNECTION */
const db = mysql.createConnection({
  host: "centerbeam.proxy.rlwy.net",     // e.g., monorail.proxy.rlwy.net
  user: "root",     // e.g., root
  password: "ZxnTjhndysgiAYvpbuLvcOduAHzNhVYt", 
  database: "railway", // usually 'railway'
  port: 42738        // e.g., 12345
  insecureAuth:true 
});

db.connect(function(err){
  if(err) throw err;
  console.log("Connected to MySQL");
});

/* SAVE CONTACT FORM */
app.post("/save", function(req, res){
    console.log("Full Request Body:", req.body); // This should NOT be undefined now

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Fill all fields! Data received was: " + JSON.stringify(req.body));
    }

    const sql = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], function(err, result) {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send("Database error");
        }
        res.status(200).json({sucess:true, message:"Message sent successfully!"
});
    });
});

/* SERVER */
app.listen(3000,function(){
  console.log("Server running on port 3000");
});