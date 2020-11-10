const express = require("express")

const bodyParser = require("body-parser")
const cors = require("cors")

//initial


const app = new express()

app.set("view engine", "ejs")


//database


//middlewares


app.use(bodyParser.json())
app.use(cors())



//routes
const startRoutes = require("./routes/start")

app.use("/start", startRoutes)

app.get("/", (req, res) => {
    res.render("verifyMail")
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

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
    console.log("server are running at port " + port)
})