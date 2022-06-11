const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

module.exports = {
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
  async getAnswer(surveyId, qId) {
    if (!surveyId) throw "surveyId missing!";

    db.query(
      "SELECT * FROM answers WHERE surveyId = ? AND qId = ?",
      [surveyId, qId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "answer found!";
        }
      }
    );
  },
};
