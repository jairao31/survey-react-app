const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

//Route to get all survey
router.get("/", (req, res) => {
  db.query("SELECT * FROM surveyList", (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let arr = [];
      result.forEach((el) => {
        let ob = {};
        ob["id"] = el.id;
        ob["name"] = el.name;
        ob["description"] = el.description;
        arr.push(ob);
      });
      res.json(arr);
    }
  });
});

//route to create survey
router.post("/createSurvey", (req, res) => {
  const reqData = req.body;
  const { surveyId, name, desc } = reqData;
  db.query(
    "INSERT INTO surveyList (id, name, description) VALUES (?,?,?)",
    [surveyId, name, desc],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json("New survey added!");
      }
    }
  );
});

//route to create question for survey
router.post("/createQuestion/:surveyId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const reqData = req.body;
  const { qId, question, type } = reqData;
  db.query(
    "INSERT INTO questions (qId, question, type, surveyId) VALUES (?,?,?,?)",
    [qId, question, type, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(`New question added for ${surveyID}`);
      }
    }
  );
});

//route to create question choice
router.post("/createQuestionChoice/:surveyId/:qId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const reqData = req.body;
  const { cId, cQuestion } = reqData;
  db.query(
    "INSERT INTO questionChoices (cId, cQuestion, questionId, surveyId) VALUES (?,?,?,?)",
    [cId, cQuestion, qID, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(`New question choice added for ${qID}`);
      }
    }
  );
});

//route to get all question
router.get("/getAllQuestions/:surveyId", async (req, res) => {
  const surveyID = req.params.surveyId;
  db.query(
    "SELECT * FROM questions WHERE surveyId = ?",
    surveyID,
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let arr = [];
        result.forEach((el) => {
          let ob = {};
          ob["qId"] = el.qId;
          ob["question"] = el.question;
          ob["type"] = el.type;
          ob["surveyId"] = el.surveyId;
          arr.push(ob);
        });
        res.json(arr);
      }
    }
  );
});

//route to get all choices for a question
router.get("/getAllQchoices/:surveyId/:questionId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const questionID = req.params.questionId;
  db.query(
    "SELECT * FROM questionChoices WHERE questionId = ? AND surveyId = ?",
    [questionID, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let arr = [];
        result.forEach((el) => {
          let ob = {};
          ob["cId"] = el.cId;
          ob["cQuestion"] = el.cQuestion;
          ob["questionId"] = el.questionId;
          ob["surveyId"] = el.surveyId;
          arr.push(ob);
        });
        res.json(arr);
      }
    }
  );
});

router.get("/getAnswerByUser/:surveyId/:qId/:cId/:uId", async (req, res) => {
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const cID = req.params.cId;
  const uID = req.params.uId;
  db.query(
    "SELECT * FROM answers WHERE questionId = ? AND cQuestionId = ? AND surveyId = ? AND uId = ?",
    [qID, cID, surveyID, uID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let arr = [];
        result.forEach((el) => {
          let ob = {};
          ob["aId"] = el.aId;
          ob["uId"] = el.uId;
          ob["answer"] = el.answer;
          ob["questionId"] = el.questionId;
          ob["cQuestionId"] = el.cQuestionId;
          ob["surveyId"] = el.surveyId;
          arr.push(ob);
        });
        res.json(arr);
      }
    }
  );
});

module.exports = router;
