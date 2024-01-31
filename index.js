require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/Database_MySQL");
const SequelizeStore = require("connect-session-sequelize");
const router = require("./routes/routes");

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  try {
    await db.authenticate({ logging: false });
  } catch (error) {
    await db.sync();
    store.sync();
  }
})();


app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true, // untuk fontend mengirimkan cookie
    origin: "http://localhost:3000", // alamat frontend yang diizinkan
  })
);

app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
