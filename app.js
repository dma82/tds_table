'use strict';

const express = require('express'),
      axios = require('axios'),
      debug = require('debug')('TDS');

const port = 3000;
let app = express();

/*
    Need to setup a server that will send requests to the endpoint.
    This is asctually necessary to avoid Cross-Origin Resource Sharing (CORS) 
    issues when calling the endpoint directly from the Angular controller
*/
app.get("/", async (req, res) => {
    try {
        const resp = await axios.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2');
        debug(resp.data);
        // Allow the resource to be accessed by any origin
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
            data: resp.data
        });
    } catch (err) {
        debug(err);
    }
});

// This is only for testing and it's called by Mocha
function stop() {
    server.close();
}

// Start the server on port 3000
var server = app.listen(port, () => {
    debug(`Listening at http://localhost:${port}`)
})

module.exports.stop = stop;
module.exports = app;
