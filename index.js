require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const apiRouter = require("./routes/api");
app.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
} catch (err) {
  console.log(err);
}
