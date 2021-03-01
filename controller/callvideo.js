var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
require('dotenv').config()

const users = [
    { identity: "user1", role: "user" },
    { identity: "user2", role: "user" },
    { identity: "user3", role: "user" },
    { identity: "user4", role: "user" },
    { identity: "user5", role: "user" },
    { identity: "admin", role: "host" }
]


const getToken = (req, res, next) => {
    var identity = req.query['identity'];

    if (!identity) {
        return res.status(400).send({
            body: "An identity is needed"
        })
    }


    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_SID,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    var grant = new VideoGrant();
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response.
    res.send({
        identity: identity,
        token: token.toJwt()
    });
}

const getUser = (req, res, next) => {
    const identity = req.query.identity

    if (!identity) {
        return res.status(400).send({
            status: "error",
            body: "identity is required..."
        })
    }

    const user = users.find(user => user.identity === identity)

    if (!user) {
        return res.status(400).send({
            status: "error",
            body: "identity not found"
        })
    }

    return res.status(200).send({
        status: "success",
        data: user
    })
}

module.exports = {
    getToken,
    getUser
}