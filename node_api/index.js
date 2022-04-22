const express = require("express");
const app = express();
const port = 3000;
const queriesRouter = require("./routes/queries");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/test", (req, res) => {
  res.json({ message: "API is alive" });
  console.log("**** GET **** Health Check ****");
});

app.use("/", queriesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});