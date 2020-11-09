var admin = require("firebase-admin");
const firebase = require("firebase");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chatapp-20537.firebaseio.com"
});
const firebaseConfig = {
    apiKey: "AIzaSyBeyfzWGbPaWoZPPlcMCSGC3SC98vQo0iU",
    authDomain: "https://appchatvue.herokuapp.com",
    databaseURL: "https://chatapp-20537.firebaseio.com",
    projectId: "chatapp-20537",
    storageBucket: "chatapp-20537.appspot.com",
    messagingSenderId: "252820002322",
    appId: "1:252820002322:web:db1251bf57a77135286acb",
    measurementId: "G-2PDZ2VDTD9"
};

firebase.initializeApp(firebaseConfig)


module.exports = {
    firebase,
    admin
}