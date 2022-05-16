const express = require("express");
const router = express.Router();

const sleepRecordsRouter = require("./sleep-records");

router.use("/sleep-records", sleepRecordsRouter);

module.exports = router;
