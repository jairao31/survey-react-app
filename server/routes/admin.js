const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.admin;
const { v4 } = require("uuid");

router.post("/createSurvey", async (req, res) => {
  const reqData = req.body;
  const { surveyId, name, desc } = reqData;
  const output = await adminData.createSurvey(surveyId, name, desc);
  res.json(output);
});

router.post("/createQuestion", async (req, res) => {
  const reqData = req.body;
  const { question, type, surveyId } = reqData;
  qId = v4();
  const output = await adminData.createQuestion(qId, question, type, surveyId);
  res.json(output);
});

module.exports = router;