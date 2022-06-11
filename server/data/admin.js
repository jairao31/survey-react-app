const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

module.exports = {
  // to create new survey
  async createSurvey(surveyId, name, desc) {
    if (!surveyId || !name || !desc) throw "survey details missing!";

    db.query(
      "INSERT INTO surveyList (id, name, description) VALUES (?,?,?)",
      [surveyId, name, desc],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "New survey added!";
        }
      }
    );
  },

  // to create questions for a survey
  async createQuestion(qId, question, type, surveyId) {
    if (!qId || !question || !type || !surveyId)
      throw "question details missing!";

    db.query(
      "INSERT INTO questions (qId, question, type, surveyId) VALUES (?,?,?,?)",
      [qId, question, type, surveyId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question added!";
        }
      }
    );
  },

  async createQuestionChoice(cId, cQuestion, questionId) {
    if (!cId || !cQuestion || !questionId)
      throw "question choice details missing!";

    db.query(
      "INSERT INTO questionChoices (cId, cQuestion, questionId) VALUES (?,?,?)",
      [cId, cQuestion, questionId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question choice added!";
        }
      }
    );
  },

  // to get answers in a survey
  async getAnswer(questionId, cQuestionId) {
    if (!questionId || !cQuestionId) throw "Id missing!";

    db.query(
      "SELECT answer FROM answers WHERE questionId = ? AND cQuestionId = ?",
      [questionId, cQuestionId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return result;
        }
      }
    );
  },

  // get all survey
  async getAllSurvey() {
    db.query("SELECT * FROM surveyList", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    });
  },
};
