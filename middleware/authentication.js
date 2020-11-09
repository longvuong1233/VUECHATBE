const db = require("../database/config.js")

module.exports = async(req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            throw "Unauthiorized"
        } else {
            const idToken = req.headers.authorization.split("Bearer ")[1];
            req.user = await db.admin.auth().verifyIdToken(idToken);
            next();
        }
    } catch (e) {
        res.status(201).json(e)
    }
}