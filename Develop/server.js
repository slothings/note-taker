// requires
const express = require("express");
const path = require("path");
const fs = require("fs");

// server setup
const app = express();
const PORT = process.env.PORT || 3000; 
const mainDir = path.join(__dirname, "/public");

// path to notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

// path to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

app.listen(PORT, function() {
    console.log(`PORT:${PORT} is online!`);
})