const https = require("https");

/**
 * This is a wrapper class for making a request to the canvas API to standardize the form of the request.
 * @param {string} apiPath Path ending for accessing at the api.
 * @param {string} access_token The access token for use with the api.
 */
const canvasRequest = function(apiPath, access_token) {
    const reqHeaders = {
        "Authorization": "Bearer " + access_token,
        "Accept": "application/json+canvas-string-ids"
    }
    const options = {
        hostname: "canvas.instructure.com",
        port: 443,
        path: "/api/v1/" + apiPath,
        headers: reqHeaders,
        method: "GET"
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                res.destroy()
                reject({statusCode: res.statusCode});
            }
            let resString = "";
            res.on("data", (chunk) => {
                resString = resString.concat(chunk);
            });
            res.on("end", () => {
                let data;
                try {
                    data = JSON.parse(resString);
                } catch (err) {
                    console.log(resString)
                    resolve({data: resString});
                }
                resolve(data);
            })
        });
    
        req.end();
    })
}

exports.canvasRequest = canvasRequest;
