const jwt = require("jsonwebtoken")

const privateKey = process.env["JWTKEY"] || "hadinh"

const createToken = (data, time) => {
    try {
        const result = jwt.sign(data, privateKey, { expiresIn: time })
        return result
    } catch (error) {
        throw error;
    }
}

const decoded = (token) => {
    try {
        const result = jwt.verify(token, privateKey)
        return result
    } catch (err) {
        throw err
    }
}


module.exports = {
    createToken,
    decoded
}