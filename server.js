const express = require("express");
const app = express();
const logger = require("morgan");
const ScoreBoardRouter = require("./routes/api/scoreboard");
const Scoreboard = require("./models/Scoreboard");
const port = process.env.PORT || 8080;

//Connect with MongoDB
const connectDB = require("./config/db");
connectDB();

app.use("/", ScoreBoardRouter);
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.set("port", port);

app.listen(port, function (req, res) {
  console.log(`Server is running in ${port}`);
});
