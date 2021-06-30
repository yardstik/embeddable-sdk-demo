// server/index.js
const express = require("express");
var app = express()


const PORT = process.env.PORT || 3001;

const axios = require('axios').default;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.post("/yardstik-jwt", (req, res, next) => {
  console.log('in express route');

  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Account cf4facdf3b3a0c199f48bcae1c09bba54df41ebc',
      "Content-Type": 'application/json',
      /* 'Access-Control-Allow-Origin': '*' <-- This is not needed here.
         This is the backend request header.
         You need to add the cors stuff to the server response header below.
         It tells the browser it's allowed to render the content
       */
    },
  }
  const json = JSON.stringify({ user_email: 'erin.black@yardstik.com' });
 axios.post('https://admin.yardstik-staging.com/web_tokens',json, options)
  .then(response => {
      // Add headers to server RESPONSE (not servers request to the yardstik api)
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      console.log('in server then with ',response.data);
      res.status(200).json(response.data);
  })
  .catch(error => {
    console.log('in catch in express with error', error.response);
    next(error);
    throw new Error(error);
  });
 
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


