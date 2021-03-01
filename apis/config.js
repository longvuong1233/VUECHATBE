const aixos = require("axios")
const instance = aixos.create({
    baseURL: "https://chatapp-20537.firebaseio.com"
})


module.exports = instance