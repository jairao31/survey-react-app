// const mysql = require("mysql");
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "survey",
// });

// module.exports = {
//   // to create new user
//   async createUser(uId, username) {
//     if (!uId || !username) throw "details missing!";

//     db.query(
//       "INSERT INTO user (uId, username) VALUES (?,?)",
//       [uId, username],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           return "New user added!";
//         }
//       }
//     );
//   },

//   // async getAllUser(){
//   //   db.query("SELECT * FROM user", (err,result) => {
//   //     if(err){
//   //       con
//   //     }
//   //   })
//   // }

//   // to create an answer for a choice in a question
//   async createAnswer(aId, uId, answer, questionId, cQuestionId, surveyId) {
//     if (!aId || !uId || !answer || !questionId || !cQuestionId || !surveyId)
//       throw "answer details missing!";

//     db.query(
//       "INSERT INTO answers (aId, uId, answer, questionId, cQuestionId, surveyId) VALUES (?,?,?,?,?,?)",
//       [aId, uId, answer, questionId, cQuestionId, surveyId],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           return result;
//         }
//       }
//     );
//   },
// };
