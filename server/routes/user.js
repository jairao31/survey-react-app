const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.user;

router.post("/createAnswer", async (req, res) => {
  const reqData = req.body;
  const { aId, answer, surveyId, questionId } = reqData;
  const output = await data.createAnswer(aId, answer, surveyId, questionId);
  res.json(output);
});

module.exports = router;
