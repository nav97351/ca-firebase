const functions = require("firebase-functions");


module.exports.oauthStart = functions.https.onRequest((req, res) => {
    functions.logger.log(req)
    res.send(req)
})