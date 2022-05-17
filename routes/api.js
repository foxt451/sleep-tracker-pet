const express = require("express");
const router = express.Router();

const sleepRecordsRouter = require("./sleep-records");
const authRouter = require("./auth");

const authMiddleware = require("../middleware/auth");

router.use("/sleep-records", authMiddleware, sleepRecordsRouter);
router.use("/auth", authRouter);

const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swaggerDoc.yaml");

const swaggerUi = require("swagger-ui-express");
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDoc));

module.exports = router;
