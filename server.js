require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./db/conn")

app.use(express.json())
app.use(express.static("public"));

app.get("/api/tasks", async (_, res) => {
    try {
        await db.query('SELECT * FROM tasks', (error, results) => {
            // console.log(results)
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error(error.message)
    }
  });

app.post("/api/create", async (req, res) => {
   try {
    const {task_content, due_date, completed} = req.body
    console.log(req.body)
    await db.query('INSERT INTO tasks (task_content, due_date, completed) VALUES ($1, $2, $3)', [task_content, due_date, completed], (error, results) => {
        console.log(req.body)
        res.status(200).send(`${req.body} task was added`)
    })
    } catch (error) {
       console.error(error.message)
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})

//Error handling
app.use((req, res) => {
    res.status(404).send("Not Found")
})