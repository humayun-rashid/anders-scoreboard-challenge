
const express = require("express");
const app = express();
const logger = require('morgan');
app.use(express.json({ extended: false }))
const ScoreBoardRouter = require("./routes/api/scoreboard")
const Scoreboard = require("./models/Scoreboard")
const port = process.env.PORT || 8080;
const connectDB = require('./config/db')
connectDB()
app.use('/', ScoreBoardRouter)

app.set('port', port);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));



app.listen(port, function (req, res) {
    console.log(`Server is running in ${port}`);
});