const db = require("../database/config")
const mailer = require("../mailer/config")
const ejs = require("ejs")


const signup = (req, res, next) => {
    const { email, password, displayName } = req.body;

    db.firebase.auth().createUserWithEmailAndPassword(email, password).then((createUser) => {

        createUser.user.updateProfile({ displayName }).then(() => {
            res.status(201).json(createUser)
        }).catch(error => {
            next(error)
        })


    }).catch((error) => {
        next(error)
    })
}

const signin = (req, res, next) => {

    const { email, password } = req.body
    db.firebase.auth().signInWithEmailAndPassword(email, password).then((user => {
        res.status(200).json(user)
    })).catch(error => {

        next(error)
    })
}

const logout = async(req, res, next) => {
    try {
        await db.firebase.auth().signOut();
        res.status(200).json({
            result: true
        });
    } catch (error) {
        next(error)
    }
}


const checkAuth = async(req, res, next) => {
    res.status(200).json(req.user)
}

const refreshToken = async(req, res, next) => {
    try {
        const { refreshToken } = req.body

        const result = await db.firebase.auth().currentUser.getIdToken(true)
        res.status(200).json({
            idToken: result
        })
    } catch (error) {
        next(error)
    }
}

const emailVerification = async(req, res, next) => {
    try {

        const email = db.firebase.auth().currentUser.email

        const emailHTML = await ejs.renderFile(__dirname.replace("controller", "views") + "/verifyMail.ejs", { name: "hadinh" })
        const mailOptions = {
            from: process.env['NAME'] || "Appchat",
            to: email,
            subject: "Verification email!!",
            html: emailHTML
        }
        mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err
            } else {
                console.log("mes", info.response)
                res.status(200).json({
                    result: true
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

const handlerEmail = (req, res, next) => {
    console.log(req)
    res.status(200).json({ ha: "Sds" })
}




module.exports = {
    signup,
    signin,
    logout,
    checkAuth,
    refreshToken,
    emailVerification,
    handlerEmail
}