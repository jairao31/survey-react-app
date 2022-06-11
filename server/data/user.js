const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

module.exports = {
  async getQuestionsByQId(questionId) {
    if (!questionId) throw "surveyId missing!";

    db.query(
      "SELECT * FROM questionChoices WHERE questionId = ?",
      questionId,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question choice found!";
        }
      }
    );
  },
  async createAnswer(aId, answer, questionId, cQuestionId) {
    if (!aId || !answer || !questionId || !cQuestionId)
      throw "answer details missing!";

    db.query(
      "INSERT INTO answers (aId, answer, questionId, cQuestionId) VALUES (?,?,?,?)",
      [aId, answer, questionId, cQuestionId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "answer added!";
        }
      }
    );
  },
};
