const express = require("express");
const authRouteV1 = require("./v1/AuthRoute");
const userRouteV1 = require("./v1/UserRoute");
const ProductRouteV1 = require("./v1/ProductRoute");
const morgan = require("morgan");

// version 1
const v1 = express.Router();
v1.use(morgan("dev"));
v1.use("/", [authRouteV1, userRouteV1, ProductRouteV1]);

const router = express.Router();
router.use("/api/v1", v1);

// default version
router.use("/api", v1);

module.exports = router;