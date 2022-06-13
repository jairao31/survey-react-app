const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

//route to get all user
router.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let arr = [];
      result.forEach((el) => {
        let ob = {};
        ob["uId"] = el.uId;
        ob["username"] = el.username;
        arr.push(ob);
      });
      res.json(arr);
    }
  });
});

//route to create user
router.post("/createUser", (req, res) => {
  const reqData = req.body;
  const { uId, username } = reqData;
  db.query(
    "INSERT INTO user (uId, username) VALUES (?,?)",
    [uId, username],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(`New user ${username} created!`);
      }
    }
  );
});

//route to create an answer for a choice in a question in a survey
router.post("/createAnswer/:surveyId/:qId/:cId/:uId", async (req, res) => {
  const reqData = req.body;
  const { aId, answer } = reqData;
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const cID = req.params.cId;
  const uID = req.params.uId;
  db.query(
    "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
    [aId, uID, answer, qID, cID, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(`Answer submitted for ${username}`);
      }
    }
  );
});

module.exports = router;
