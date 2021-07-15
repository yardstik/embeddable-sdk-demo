// server/index.js
const express = require("express");
var app = express()

const PORT = process.env.PORT || 3001;
const token = process.env.API_KEY;
const email = process.env.EMAIL;

const axios = require('axios').default;

app.post("/yardstik-jwt", (req, res, next) => {
  // Set Header to include apiKey associates with user's account
  // You can get your apiKey in the developer tab of the Yardstik app
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Account ${token}`,
      "Content-Type": 'application/json',
      /* 'Access-Control-Allow-Origin': '*' <-- This is not needed here.
         This is the backend request header.
         You need to add the cors stuff to the server response header below.
         It tells the browser it's allowed to render the content
       */
    },
  }

  // The request body should include the email of the user
  const json = JSON.stringify({ user_email: email });

  // Make a request to the Yardstik backend to get the JWT for the user
  axios.post('https://admin.yardstik-staging.com/web_tokens', json, options)
    .then(response => {
      // Add headers to server RESPONSE (not servers request to the yardstik api)
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      console.log('in server then with ', response.data);

      // send JWT to front end to be used in the iframe source URL
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


