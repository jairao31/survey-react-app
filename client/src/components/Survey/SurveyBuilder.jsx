import React, { useState } from "react";
import SurveyDetails from "./SurveyDetails";
import SurveyQuestion from "./SurveyQuestion";
import { useInputValue } from "../Hooks/Hooks";
import Question from "../Models/Question";
import ListController from "../Controllers/ListController";

import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

import Navigate from "../Navigate";
import { useNavigate } from "react-router-dom";

export default function SurveyBuilder() {
  //   const [title, handleChangeTitle] = useInputValue("New Survey");
  const [surveyID, setSurveyID] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");
  const [questions, setQuestions] = useState([]);
  // new Question({
  //   text: "What's your favorite color?",
  //   options: ["Blue", "Orange", "White", "Purple"],
  // }),

  const listController = new ListController(questions, setQuestions);

  let navigate = useNavigate();

  return (
    <Container>
      <Navigate />
      {/* <Stack direction="horizontal" gap={3}>
        <div>
          <h2>New Survey</h2>
        </div>
        <div className="ms-auto">
          <Button onClick={() => listController.add(new Question())}>
            ✚ Add Question
          </Button>
        </div>
        <div className="vr" />
        <div>
          <Button
            variant="success"
            onClick={async () => {
              const result = await listController.create({
                surveyId: surveyID,
                name: surveyName,
                desc: surveyDesc,
              });
              if (result) {
                alert(`Survey ${surveyID} created`);
                navigate("/admin", { replace: false });
              } else {
                alert("survey could not be created");
              }
            }}
          >
            Create Survey
          </Button>
        </div>
      </Stack> */}
      <Stack direction="horizontal" gap={3}>
        <h4>New Survey</h4>
        <div className="ms-auto">
          <Button onClick={() => listController.add(new Question())}>
            ✚ Add Question
          </Button>
        </div>
        <div className="vr" />
        <div>
          <Button
            variant="success"
            onClick={async () => {
              const result = await listController.create({
                surveyId: surveyID,
                name: surveyName,
                desc: surveyDesc,
              });
              if (result) {
                alert(`Survey ${surveyID} created`);
                navigate("/admin", { replace: false });
              } else {
                alert("survey could not be created");
              }
            }}
          >
            Create Survey
          </Button>
        </div>
      </Stack>
      <br />
      {/* ////////////// */}
      <div className="newsurvey-page">
        <div className="w-50 fixed">
          <Form>
            <Form.Group className="mb-3" controlId="survey-id">
              <Form.Control
                type="text"
                placeholder="Survey ID"
                onChange={(e) => {
                  setSurveyID(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-name">
              <Form.Control
                type="text"
                placeholder="Survey Name"
                onChange={(e) => {
                  setSurveyName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-desc">
              <Form.Control
                as="textarea"
                placeholder="Survey Description"
                rows={5}
                onChange={(e) => {
                  setSurveyDesc(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <br />
          <br />
        </div>

        <div className="survey-b">
          <Stack>
            <ol>
              {questions.map((question, i) => (
                <li>
                  <div className="survey-main">
                    <SurveyQuestion
                      key={question.id}
                      question={question}
                      setQuestion={(question) =>
                        listController.set(i, question)
                      }
                      removeQuestion={() => listController.remove(i)}
                      moveQuestionUp={() => listController.moveUp(i)}
                      moveQuestionDown={() => listController.moveDown(i)}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </Stack>
        </div>
      </div>

      {/* <Stack direction="horizontal"> */}
      {/* <div className="w-25 p-3 fixed">
          <Form>
            <Form.Group className="mb-3" controlId="survey-id">
              <Form.Control
                type="text"
                placeholder="Survey ID"
                onChange={(e) => {
                  setSurveyID(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-name">
              <Form.Control
                type="text"
                placeholder="Survey Name"
                onChange={(e) => {
                  setSurveyName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-desc">
              <Form.Control
                as="textarea"
                placeholder="Survey Description"
                rows={5}
                onChange={(e) => {
                  setSurveyDesc(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div> */}
      {/* <div className="vr" /> */}
      {/* <Stack>
          <ol>
            {questions.map((question, i) => (
              <li>
                <SurveyQuestion
                  key={question.id}
                  question={question}
                  setQuestion={(question) => listController.set(i, question)}
                  removeQuestion={() => listController.remove(i)}
                  moveQuestionUp={() => listController.moveUp(i)}
                  moveQuestionDown={() => listController.moveDown(i)}
                />
              </li>
            ))}
          </ol>
        </Stack> */}
      {/* </Stack> */}
      <br />
      <br />
    </Container>
  );
}
