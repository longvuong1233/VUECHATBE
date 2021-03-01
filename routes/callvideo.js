const express = require("express")

const controller = require('../controller/callvideo')
const router = express.Router()


router.get("/token", controller.getToken)

router.get("/getuser", controller.getUser)

module.exports = router