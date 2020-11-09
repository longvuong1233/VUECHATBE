const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

//initial


const app = new express()


//database


//middlewares

app.use(logger("dev"))
app.use(bodyParser.json())
app.use(cors())
    //routes
const startRoutes = require("./routes/start")

app.use("/start", startRoutes)

app.get("/", () => {
    console.log("ga")
})

//handle error

app.use((err, req, res, next) => {
    const status = err.status || 500
    console.log(err.message)
    return res.status(status).json({
        message: err.message
    })
})


//start server

const port = app.get("port") | 3000
app.listen(port, () => {
    console.log("server are running at port " + port)
})