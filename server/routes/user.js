const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

const { v4 } = require("uuid");

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
  const { username } = reqData;
  const uId = v4();
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
router.post("/createAnswer/:surveyId/:qId/:uId", async (req, res) => {
  const reqData = req.body;
  const { answer, cId } = reqData;
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const uID = req.params.uId;
  const aId = v4();
  db.query(
    "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
    [aId, uID, answer, qID, cId, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(`Answer submitted for ${uID}`);
      }
    }
  );
});

module.exports = router;
