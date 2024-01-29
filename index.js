require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
