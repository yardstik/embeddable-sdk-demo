// server/index.js
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const axios = require('axios').default;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get("/yardstik-jwt", (req, res) => {
  console.log('in express route');
  const api = axios.create({
    baseURL: 'https://admin.yardstik-staging.com',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer cf4facdf3b3a0c199f48bcae1c09bba54df41ebc'
    },
  });

  api.get('/web_tokens')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log('in catch in express with error', error);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


