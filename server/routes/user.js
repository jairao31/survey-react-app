const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.user;
const { v4 } = require("uuid");

router.post("/createAnswer", async (req, res) => {
  const reqData = req.body;
  const { answer, surveyId, questionId } = reqData;
  aId = v4();
  const output = await adminData.createAnswer(
    aId,
    answer,
    surveyId,
    questionId
  );
  res.json(output);
});

module.exports = router;
