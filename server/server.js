const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allowed-Methods", "DELETE, GET, OPTIONS, POST, PUT");
    next();
});

/**
 * GET (Request) listener
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "./index.html"));
});
app.get("/csv/:studentNumber?/:mapId?", (req, res) => {
    console.log("I want transportation, possibly with a studentNumber, maybe mapId");
    res.sendFile(path.join(__dirname, "../client/public", "./index.html"));
});
app.get("/notFound", (req, res) => {
    console.log("Not Found Page");
    res.sendFile(path.join(__dirname, "../client/public", "./index.html"));
});

/**
 * POST listener
 */
app.post("/post", (req, res) => {
   console.log("Connected to React");
   res.redirect("/");
});

app.listen(PORT, HOST, () => {
    console.log(`Server ${HOST} is listening on this port: ${PORT}`);
    console.log("static is here: ", path.join(__dirname, "../client/public"));
});
