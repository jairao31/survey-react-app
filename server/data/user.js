const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "survey",
});

module.exports = {
  async getQuestion(surveyId) {
    if (!surveyId) throw "surveyId missing!";

    db.query(
      "SELECT * FROM questions WHERE surveyId = ?",
      surveyId,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question found!";
        }
      }
    );
  },
  async createAnswer(aId, answer, surveyId, questionId) {
    if (!aId || !answer || !surveyId || !questionId)
      throw "answer details missing!";

    db.query(
      "INSERT INTO answers (aId, answer, surveyId, questionId) VALUES (?,?,?,?)",
      [aId, answer, surveyId, questionId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return "question added!";
        }
      }
    );
  },
};
