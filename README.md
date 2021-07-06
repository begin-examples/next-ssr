# Next.js SSR

This is a starter template for [Next.js](https://nextjs.org), extended to deploy with [Begin](https://begin.com) that includes server side rendering.


## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/nextjs-ssr)

Deploy your own clone of this app to Begin!

## Getting started

### Project setup

```bash
npm install
```

### Start the local dev server

```bash
npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). You should see your app running.

## Begin Reference

- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!

## Adding a Next App to Begin

The following steps can be used to deploy most Next apps to Begin.com. 
- Install dependencies to wrap Next server
  ```bash
  npm i express serverless-http
  ```

- Add `app.arc` manifest file to the root folder
  ```
  #app.arc
  @app
  next-SSR

  @http
  /*
    method get
    src begin
  ```

- Add a handler to server the Next App to the `begin` folder.
  ```javascript
  //index.js
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
  ```

- Add a build script to `package.json` to run on Begin.
  ```json
  "scripts": {
    "build": "NODE_ENV=production next build && cp -r .next begin/.next "
  } 
  ```
- Add build output folder to `.gitignore`
  ```git
  #.gitignore
  /begin/.next
  ```
