require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./db/conn")


app.use(express.json())
app.use(express.static("public"));

app.get("/api/tasks", async (_, res) => {
    try {
        await db.query('SELECT * FROM tasks', (error, results) => {
            console.log(results)
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error(error.message)
    }
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})