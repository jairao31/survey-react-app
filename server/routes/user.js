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

//route to get all submission by user for a survey
router.get("/getSubmission/:surveyId", (req, res) => {
  const surveyID = req.params.surveyId;
  db.query("SELECT * FROM user WHERE surveyId = ?", surveyID, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let arr = [];
      result.forEach((el) => {
        let ob = {};
        ob["uId"] = el.uId;
        ob["username"] = el.username;
        ob["surveyId"] = el.surveyId;
        arr.push(ob);
      });
      res.json(arr);
    }
  });
});


//route to submit survey by a user
router.post("/submitSurvey/:surveyId", async (req, res) => {
  const reqData = req.body;
  const { username } = reqData;
  const surveyID = req.params.surveyId;
  const uId = v4();

  await db.query(
    "INSERT INTO user (uId, username, surveyId) VALUES (?,?,?)",
    [uId, username, surveyID],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(uId);
      }
    }
  );
});

//route to create an answer for a choice in a question in a survey
// router.post("/createAnswer/:surveyId/:uId", async (req, res) => {
//   const reqData = req.body;
//   const { answers } = reqData;
//   // answers = [
//   //   {
//   //     qID,
//   //     cId,
//   //     answer
//   //   }
//   // ]
//   const surveyID = req.params.surveyId;
//   const uID = req.params.uId;

//   answers.forEach(async (el) => {
//     aId = v4();
//     await db.query(
//       "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
//       [v4(), uID, el.answer, el.qID, el.cId, surveyID],
//       (err) => {
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//   });
//   res.json(`Answer submitted for user id ${uID}`);
// };);

router.post("/createAnswer/:surveyId/:uId", async (req, res) => {
  const reqData = req.body;
  const { answers } = reqData;
  const surveyID = req.params.surveyId;
  const uID = req.params.uId;

  answers.forEach(async (el) => {
    aId = v4();

    await db.query(
      "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
      [v4(), uID, el.answer, el.qID, el.cId, surveyID],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});
  
  




// })

module.exports = router;

// db.query(
  //   "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
  //   [aId, uID, answer, qID, cId, surveyID],
  //   (err, result) => {
  //     if (err) {
  //       res.json(err);
  //     } else {
  //       res.json(`Answer submitted for user id ${uID}`);
  //     }
  //   }
  // );

  // //route to get list of submission by surveyID
// router.get('/getSubmission/:surveyId', (req,res) => {
//   const surveyID = req.params.surveyId;