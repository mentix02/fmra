// noinspection JSCheckFunctionSignatures

require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const apiRouter = require("./routes");

const PORT = process.env.PORT || "3000";
const DB_HOST = process.env.DB_HOST || "mongodb://127.0.0.1:27017/fmra";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use(express.static(__dirname + "/ui/dist/ui/"));
app.use((req, res) => {
  res.sendFile(__dirname + "/ui/dist/ui/index.html");
});

// noinspection JSVoidFunctionReturnValueUsed,JSUnresolvedFunction
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server started on port http://localhost:${process.env.PORT}`
      );
    });
  });
