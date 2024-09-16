// server/index.js
require("dotenv").config();

const cors = require("cors");
const axios = require("axios").default;
const express = require("express");

const app = express();
app.use(cors());
app.use(express.static("build"));

const PORT = process.env.PORT || 3001;

/***
 * Define a route for the frontend to call to receive a token.
 * The route must accept a JSON body which includes the email address of the user viewing the embedded content
 * The email address must belong to a user registered in Yardstik and associated with the account that API_KEY belongs to
 *
 * sample body: { "user_email": "user@example.com", "api_key": "API_KEY" }
 */
app.post("/token", express.json({ type: "*/*" }), (req, res, next) => {
  // Set Header to include yardstik apiKey
  // Get the api_key in the developer tab of the Yardstik app

  if (!req.body.api_key) {
    throw new Error(
      "Request body should include the api_key key with a valid value"
    );
  }

  if (!req.body.user_email) {
    throw new Error(
      "Request body should include the user_email key with a valid email"
    );
  }

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Account ${req.body.api_key}`,
      "Content-Type": "application/json",
    },
  };

  console.log(req.body);
  // Make a request to the Yardstik backend to get the JWT for the user
  axios
    .post(
      `${process.env.YARDSTIK_API_URL}/web_tokens`,
      JSON.stringify(req.body),
      options
    )
    .then((response) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.header("Access-Control-Allow-Headers", "content-type");
      res.header("Access-Control-Allow-Headers", "Accept");

      // send JWT to front end to be used in the iframe source URL
      res.status(200).json(response.data);
    })
    .catch((error) => {
      next(error);
      throw new Error(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
