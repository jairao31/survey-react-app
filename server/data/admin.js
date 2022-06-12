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

  // to create question choices
  async createQuestionChoice(cId, cQuestion, questionId, surveyId) {
    if (!cId || !cQuestion || !questionId || !surveyId)
      throw "question choice details missing!";

    db.query(
      "INSERT INTO questionChoices (cId, cQuestion, questionId, surveyId) VALUES (?,?,?,?)",
      [cId, cQuestion, questionId, surveyId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question choice added!";
        }
      }
    );
  },

  // to get list of questions in a survey
  async getAllQuestions(surveyId) {
    if (!surveyId) throw "Survey Id missing!";

    db.query(
      "SELECT * FROM questions WHERE surveyId = ?",
      surveyId,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return result;
        }
      }
    );
  },

  // to get all the choices in a question
  async getAllQchoices(surveyId, questionId) {
    if (!surveyId || !questionId) throw "Id missing!";

    db.query(
      "SELECT * FROM questionChoices WHERE questionId = ? AND surveyId = ?",
      [questionId, surveyId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return result;
        }
      }
    );
  },

  // to get answers of a choice of a question in a survey by userId
  async getAnswerByUser(uId, questionId, cQuestionId, surveyId) {
    if (!uId || !questionId || !cQuestionId || !surveyId) throw "Id missing!";

    db.query(
      "SELECT * FROM answers WHERE questionId = ? AND cQuestionId = ? AND surveyId = ? AND uId = ?",
      [questionId, cQuestionId, surveyId, uId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return result;
        }
      }
    );
  },

  // to get all survey
  async getAllSurvey() {
    db.query("SELECT * FROM surveyList", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(typeof result);
        return result;
      }
    });
  },
};
