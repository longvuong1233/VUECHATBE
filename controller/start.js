const db = require("../database/config")


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
        console.log("Dsa")
        const actionCodeSettings = {
            url: "https://www.youtube.com/watch?v=yO1rhOAeKMM",
            handleCodeInApp: true
        }
        const result = await db.firebase.auth().sendSignInLinkToEmail(db.firebase.auth().currentUser.email, actionCodeSettings)


        console.log(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}




module.exports = {
    signup,
    signin,
    logout,
    checkAuth,
    refreshToken,
    emailVerification
}