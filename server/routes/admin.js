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
        res.json(`New survey ${surveyId} created!`);
      }
    }
  );
});

//route to create question for survey
router.post("/createQuestion/:surveyId", (req, res) => {
  const surveyID = req.params.surveyId;
  const reqData = req.body;
  const { question, type, options } = reqData;
  const qId = v4();
  db.query(
    "INSERT INTO questions (qId, question, type, surveyId) VALUES (?,?,?,?)",
    [qId, question, type, surveyID],
    async (err, result) => {
      if (err) {
        res.json(err);
      } else {
        await options.forEach(async (i) => {
          await db.query(
            "INSERT INTO questionChoices (cId, cQuestion, questionId, surveyId) VALUES (?,?,?,?)",
            [v4(), i, qId, surveyID],
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        });
        res.json(`New question added for ${surveyID}`);
      }
    }
  );
});

//route to create question choice
// router.post("/createQuestionChoice/:surveyId/:qId", (req, res) => {
//   const surveyID = req.params.surveyId;
//   const qID = req.params.qId;
//   const reqData = req.body;
//   const { cQuestion } = reqData;
//   const cId = v4();
//   db.query(
//     "INSERT INTO questionChoices (cId, cQuestion, questionId, surveyId) VALUES (?,?,?,?)",
//     [cId, cQuestion, qID, surveyID],
//     (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(`New question choice added for ${qID}`);
//       }
//     }
//   );
// });

//route to get survey details by id

router.get('/getSurveyDetailsByID/:surveyId', (req,res) => {
  const surveyID = req.params.surveyId;
  db.query("SELECT id, name, description FROM surveyList", (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
})

//route to get all question
router.get("/getAllQuestions/:surveyId", (req, res) => {
  const surveyID = req.params.surveyId;
  db.query(
    "SELECT * FROM questions WHERE surveyId = ?",
    surveyID,
    async (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let arr = [];
        await result.forEach(async (el) => {
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
router.get("/getAllQchoices/:surveyId/:questionId", (req, res) => {
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

//route to get answer for a question by a user
router.get("/getAnswerByUser/:surveyId/:qId/:cId/:uId", (req, res) => {
  const surveyID = req.params.surveyId;
  const qID = req.params.qId;
  const cID = req.params.cId;
  const uID = req.params.uId;
  db.query(
    "SELECT answer FROM answers WHERE uId = ? AND questionId = ? AND cQuestionId = ? AND surveyId = ?",
    [uID, qID, cID, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        // let arr = [];
        // result.forEach((el) => {
        //   let ob = {};
        //   ob["aId"] = el.aId;
        //   ob["uId"] = el.uId;
        //   ob["answer"] = el.answer;
        //   ob["questionId"] = el.questionId;
        //   ob["cQuestionId"] = el.cQuestionId;
        //   ob["surveyId"] = el.surveyId;
        //   arr.push(ob);
        // });
        res.json(result);
      }
    }
  );
});

//route to delete survey
router.delete("/deleteSurvey/:surveyid", (req, res) => {
  const surveyID = req.params.surveyid;
  db.query("DELETE FROM surveyList WHERE id = ?", surveyID, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(`Survey ${surveyID} deleted successfully!`);
    }
  });
});

//route to get username by uid
router.get("/getUsername/:uId", (req, res) => {
  const userID = req.params.uId;
  db.query("SELECT * FROM users WHERE uId = ?", userID, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
