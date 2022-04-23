const functions = require("firebase-functions");
const cors = require("cors");
const {canvasRequest} = require("./canvasRequest");
const express = require('express');
const app = express();

//this function receives all the requests coming in oauth flow and logs them out and also prints then 
app.get('/:allRequests',(req,res) =>{
  functions.logger.log(req.params.allRequests);
  return res.status(200).send(req.params.allRequests)
});

exports.app = functions.https.onRequest(app);

module.exports.oauthStart = functions.https.onRequest((req, res) => {
    functions.logger.log(req.body)
    res.send(JSON.stringify(req.body, null, 4))
})


module.exports.canvasCors = functions.https.onRequest((req, res) => {
  cors()(req, res, () => {
    let access_token = req.headers.authorization.replace("Bearer ", "");
    canvasRequest(req.url.substring(1), access_token)
        .then(value => {
          res.status(200);
          res.send(value);
          
        })
        .catch(reason => {
          res.status(reason.statusCode);
          res.end();
        })
  });
});





