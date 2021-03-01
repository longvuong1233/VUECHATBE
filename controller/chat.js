const Message = require("../database/models/message")


const sendMessage = async(req, res, next) => {

    try {
        const { sender, receiver, content, idBoxchat } = req.body
        const mes = new Message(sender, receiver, content, idBoxchat)
        await mes.sendMessager()
        res.status(200).json({
            result: true
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    sendMessage
}