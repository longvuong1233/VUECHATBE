const axios = require("../../apis/config")


class message {
    constructor(sender, receiver, content, idBoxchat) {
        this.sender = sender
        this.receiver = receiver;
        this.content = content;
        this.idBoxchat = idBoxchat
        this.date = new Date()
    }

    async sendMessager() {
        await axios.post("/message.json", {
            sender: this.sender,
            receiver: this.receiver,
            content: this.content,
            idBoxchat: this.idBoxchat,
            date: this.date
        })

    }
}

module.exports = message