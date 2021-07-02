let next = require("next");
//the following are added to satisfy next required dependencies during Begin hydration
let _react = require("react")
let _react_dom = require("react-dom")
let express= require("express")
let serverless = require('serverless-http');

let app = next({ dev:false });
let handle = app.getRequestHandler();

let server= express()

server.get("*", (req, res) => {
       return handle(req, res);
     });

module.exports.handler = serverless(server)