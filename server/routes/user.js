const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;

router.post("/createUser", async (req, res) => {
  const reqData = req.body;
  const { uId, username } = reqData;
  const output = await userData.createUser(uId, username);
  res.json(output);
});

router.post("/createAnswer/:surveyId/:qId/:cId/:uId", async (req, res) => {
  const reqData = req.body;
  const { aId, answer } = reqData;
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const cID = req.params.cId;
  const uID = req.params.uId;
  const output = await userData.createAnswer(
    aId,
    uID,
    answer,
    qID,
    cID,
    surveyID
  );
  res.json(output);
});

module.exports = router;
