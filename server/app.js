require("./db/mongoose");
// const path = require("path");
const cors = require('cors')
const express = require("express")

// const publicDirectoryPath = path.join(__dirname, "../public");

const messagesRouter = require("./routers/messagesRouter");


const app = express();

// app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(cors());
app.use(messagesRouter);


module.exports = app;