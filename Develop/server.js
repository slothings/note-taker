// requires
const express = require("express");
const path = require("path");
const fs = require("fs");

// server setup
const app = express();
const PORT = process.env.PORT || 3000; 
const mainDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// path to notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

// path to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

app.listen(PORT, function() {
    console.log(`PORT:${PORT} is online!`);
})