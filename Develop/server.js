// requires
const express = require("express");
const path = require("path");
const fs = require("fs");

// server setup
const app = express();
const PORT = process.env.PORT || 3000; 

app.listen(PORT, function() {
    console.log(`PORT:${PORT} is online!`);
})