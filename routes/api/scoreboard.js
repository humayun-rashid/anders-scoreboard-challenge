const express = require("express");
const router = express.Router();

const controller = require("../../controllers/controller");
const Scoreboard = require("../../models/Scoreboard");

// Get Requests

router.get("/", controller.getScoreBoard, async function (req, res) {
  res.send(res.scoreboard);
});

router.get("/des", async function (req, res) {
  let scoreboard = await Scoreboard.find().sort({ score: 1 });
  res.send(scoreboard);
});

router.get("/date", async function (req, res) {
  let scoreboard = await Scoreboard.find().sort({ date: -1 });
  res.send(scoreboard);
});

router.get("/name", controller.findByName, async function (req, res) {
  res.send(res.response);
});

router.get("/:id", controller.findByID, async function (req, res) {
  res.send(res.response);
});

// Post Requests
router.post("/", controller.postScoreBoard, async function (req, res) {
  res.send(res.score);
});

// Delete Requests
router.delete("/:id", controller.removeByID, async function (req, res) {
  res.send(res.response);
});

router.delete("/", controller.removeByName, async function (req, res) {
  res.send(res.response);
});

module.exports = router;
