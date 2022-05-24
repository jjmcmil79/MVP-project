const express = require("express")
const app = express()
const db = require("./db/conn")
require("dotenv").config()

app.use(express.json())
app.use(express.static("public"));

app.get("/api/tasks", (_, res) => {
    db.query("SELECT * FROM tasks").then((data) => {
      res.json(data.rows);
    });
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})