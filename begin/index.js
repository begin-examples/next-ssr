let next = require("next");
let express= require("express")
let serverless = require('serverless-http');

let app = next({ dev:false });
let handle = app.getRequestHandler();

let server= express()

server.get("*", (req, res) => {
       return handle(req, res);
     });

module.exports.handler = serverless(server)