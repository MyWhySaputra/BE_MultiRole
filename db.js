const db = require("./config/Database_MySQL.js");

(async () => {
  await db.sync();
})();
