require("dotenv").config();

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");

const app = express();
app.set("trust proxy", 1);
const rateLimit = require("express-rate-limit");
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send('<h1>Sleep Tracker API</h1><a href="/api/v1/docs">See docs</a>');
});

app.get("/my-ip", (req, res) => {
  res.send(req.ip);
});

const apiRouter = require("./routes/api");
app.use("/api/v1", apiRouter);

const notFoundMiddleware = require("./middleware/not-found");
app.use(notFoundMiddleware);

const errorHandler = require("./middleware/error-handler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    const connectDb = require("./db/connect");
    console.log("Db connected");
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
