const db = require("../database/config")
const mailer = require("../mailer/config")
const ejs = require("ejs")
const jwt = require("../jwt/config")


const signup = (req, res, next) => {
    const { email, password, displayName } = req.body;

    db.firebase.auth().createUserWithEmailAndPassword(email, password).then((createUser) => {
        db.firebase.firestore().collection('user').doc(email).set({
            friends: [],
            queueFriend: [],
            inform: [],
            status: []
        });
        createUser.user.updateProfile({ displayName, verifyat: null }).then(() => {
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
    try {

        const result = await db.admin.auth().getUser(req.user.user_id)

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }



}

const refreshToken = async(req, res, next) => {
    try {


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

        const { uid, email, name } = req.user
        const token = jwt.createToken({ uid, email, "action": "emailverify" }, "1h")


        const url = "https://localhost:3000/start/handleemail?token=" + token
        const emailHTML = await ejs.renderFile(__dirname.replace("controller", "views") + "/verifyMail.ejs", { url: url, token: token, name: name })
        const mailOptions = {
            from: process.env['NAME'] || "Appchat",
            to: email,
            subject: "Verification email!!",
            html: emailHTML
        }
        mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                next(err)
            } else {

                res.status(200).json({
                    result: true
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

const handlerEmail = async(req, res, next) => {
    try {

        const { token } = req.query

        const { uid, action } = jwt.decoded(token)
        console.log(action)
        if (action == "emailverify") {
            await db.admin.auth().updateUser(uid, {
                emailVerified: true
            })

            res.writeHead(301, { "Location": "http://localhost:8080" })
            return res.end()
        } else {
            throw Error("Token is not valid")
        }
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async(req, res, next) => {
    try {

        const { email } = req.body
        console.log(email)
        db.firebase.auth().sendPasswordResetEmail(email).then(() => {
            console.log("ok")
        });
        // const result = await db.admin.auth().getUserByEmail(email)
        // console.log(result)
        // const { uid, displayName } = result
        // const token = jwt.createToken({ email, uid, displayName, "action": "forgotpw" }, "300000")


        // const emailHTML = await ejs.renderFile(__dirname.replace("controller", "views") + "/forgotPw.ejs", { token: token, displayName: displayName })
        // const mailOptions = {
        //     from: process.env['NAME'] || "Appchat",
        //     to: email,
        //     subject: "Reset Password!!",
        //     html: emailHTML
        // }
        // mailer.sendMail(mailOptions, (err, info) => {
        //     if (err) {
        //         throw err
        //     } else {
        //         console.log("mes", info.response)
        //         res.status(200).json({
        //             result: true,
        //         })
        //     }
        // })

    } catch (err) {
        next(err)
    }
}

const resetpassword = async(req, res, next) => {
    try {
        const { token } = req.body

        const { uid, email, displayName, action } = jwt.decoded(token)
        if (action == "forgotpw") {

            const result = await db.admin.auth().getUser(uid)

            if (result.email == email && result.displayName == displayName) {
                res.status(200).json({
                    result: true
                })
            } else {
                throw Error("Wrong")
            }
        } else {
            throw Error("Token is not valid")
        }
    } catch (err) {
        next(err)
    }
}

const changePassword = async(req, res, next) => {
    try {
        const { email, newPassword } = req.body
        db.firebase.auth().sendPasswordResetEmail()
        console.log(email, newPassword)
        const user = await db.admin.auth().getUserByEmail(email)
        console.log(user, "ha")
        await db.firebase.auth().signInWithCredential(user)
        const result = await db.firebase.auth().currentUser
            // const result = await db.firebase.auth().currentUser.updatePassword(newPassword)

        console.log(result, "haidnh")
        res.status(200).json({
            result: true
        })
    } catch (err) {
        next(err)
    }
}

const getAllUsers = (req, res, next) => {



    db.admin.auth().listUsers().then((userRecords) => {
        let users = []
        userRecords.users.forEach((user) => {
            if (user.uid != req.user.uid) {

                const { uid, email, displayName, photoURL } = user
                users.push({
                    uid,
                    email,
                    displayName,
                    photoURL
                })
            }
        });
        res.status(200).json(users);
    }).catch((error) => next(error));
};

const setAvatar = async(req, res, next) => {



    try {
        await db.admin.auth().updateUser(req.user.user_id, {
            photoURL: req.body.url
        })
        res.status(200)
    } catch (err) {
        next(err)
    }

}




module.exports = {
    signup,
    signin,
    logout,
    checkAuth,
    refreshToken,
    emailVerification,
    handlerEmail,
    forgotPassword,
    resetpassword,
    changePassword,
    getAllUsers,
    setAvatar
}