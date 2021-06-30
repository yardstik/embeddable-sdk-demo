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
  // const api = axios.create({
  //   baseURL: 'https://admin.yardstik-staging.com',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: 'Bearer cf4facdf3b3a0c199f48bcae1c09bba54df41ebc'
  //   },
  // });

  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Account cf4facdf3b3a0c199f48bcae1c09bba54df41ebc',
      "Content-Type": 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  }


  console.log('req.body', req.body);
  const json = JSON.stringify({ user_email: 'erin.black@yardstik.com' });
 axios.post('https://admin.yardstik-staging.com/web_tokens',json, options)
  .then(response => {
    console.log('in server then with ',response.data);
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


