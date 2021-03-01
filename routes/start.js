const express = require("express")

const router = express.Router()




const startController = require("../controller/start")
const authentication = require("../middleware/authentication")

router.get("/allusers", authentication, startController.getAllUsers)
router.post("/signup", startController.signup)
router.post("/signin", startController.signin)
router.post("/logout", startController.logout)
router.post("/checkauth", authentication, startController.checkAuth)
router.post("/refreshtoken", startController.refreshToken)

router.post("/verifyemail", authentication, startController.emailVerification)
router.get("/handleemail", startController.handlerEmail)

router.post("/forgotpassword", startController.forgotPassword)

router.post('/resetpassword', startController.resetpassword)

router.post("/changePassword", startController.changePassword)
router.post("/setavatar", authentication, startController.setAvatar)
module.exports = router