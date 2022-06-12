const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.admin;

router.get("/", async (req, res) => {
  const output = await adminData.getAllSurvey();
  res.json(output);
});

router.post("/createSurvey", async (req, res) => {
  const reqData = req.body;
  const { surveyId, name, desc } = reqData;
  const output = await adminData.createSurvey(surveyId, name, desc);
  res.json(output);
});

router.post("/createQuestion/:surveyId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const reqData = req.body;
  const { qId, question, type } = reqData;
  const output = await adminData.createQuestion(qId, question, type, surveyID);
  res.json(output);
});

router.post("/createQuestionChoice/:surveyId/:qId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const reqData = req.body;
  const { cId, cQuestion } = reqData;
  const output = await adminData.createQuestionChoice(
    cId,
    cQuestion,
    qID,
    surveyID
  );
  res.json(output);
});

router.get("/getAllQuestions/:surveyId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const output = await adminData.getAllQuestions(surveyID);
  res.json(output);
});

router.get("/getAllQchoices/:surveyId/:questionId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const questionID = req.params.questionId;
  const output = await adminData.getAllQchoices(surveyID, questionID);
  res.json(output);
});

router.get("/getAnswerByUser/:surveyId/:qId/:cId/:uId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const cID = req.params.cId;
  const uID = req.params.uId;
  const output = await adminData.getAnswerByUser(uID, qID, cID, surveyID);
  res.json(output);
});

module.exports = router;
