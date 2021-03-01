const express = require("express")
const controller = require("../controller/chat")


const router = express.Router()

router.post("/sendMes", controller.sendMessage)




module.exports = router