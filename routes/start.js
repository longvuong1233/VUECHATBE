const express = require("express")

const router = express.Router()



const startControlelr = require("../controller/start")
const authentication = require("../middleware/authentication")


router.post("/signup", startControlelr.signup)
router.post("/signin", startControlelr.signin)
router.post("/logout", startControlelr.logout)
router.post("/checkauth", authentication, startControlelr.checkAuth)
router.post("/refreshtoken", startControlelr.refreshToken)

router.post("/verifyemail", startControlelr.emailVerification)
router.get("/handlerEmail/:idtoken", startControlelr.handlerEmail)

module.exports = router