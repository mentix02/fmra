const express = require("express");

const userRouter = require("./users");
const resultRouter = require("./results");

const router = express.Router();

router.use("/users", userRouter);
router.use("/results", resultRouter);

module.exports = router;
