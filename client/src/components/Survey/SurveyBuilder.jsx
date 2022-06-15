import React, { useState } from "react";
import SurveyDetails from "./SurveyDetails";
import SurveyQuestion from "./SurveyQuestion";
import { useInputValue } from "../Hooks/Hooks";
import Question from "../Models/Question";
import ListController from "../Controllers/ListController";

import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

import Navigate from "../Navigate";

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

  return (
    <Container>
      <Navigate />
      <Stack direction="horizontal" gap={3}>
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
          <Button>Create Survey</Button>
        </div>
      </Stack>
      <br />
      <Stack direction="horizontal">
        <div className="w-25 p-3">
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
        </div>
        <div className="vr" />
        <Stack>
          <ol>
            {questions.map((question, i) => (
              <SurveyQuestion
                key={question.id}
                question={question}
                setQuestion={(question) => listController.set(i, question)}
                removeQuestion={() => listController.remove(i)}
                moveQuestionUp={() => listController.moveUp(i)}
                moveQuestionDown={() => listController.moveDown(i)}
              />
            ))}
          </ol>
        </Stack>
      </Stack>
      {/* <div className="small-container"> */}
      {/* <SurveyDetails
          // title={title} handleChangeTitle={handleChangeTitle}
          surveyID={surveyID}
          setSurveyID={setSurveyID}
          surveyName={surveyName}
          setSurveyName={setSurveyName}
          surveyDesc={surveyDesc}
          setSurveyDesc={setSurveyDesc}
        /> */}

      {/* <ol>
          {questions.map((question, i) => (
            <SurveyQuestion
              key={question.id}
              question={question}
              setQuestion={(question) => listController.set(i, question)}
              removeQuestion={() => listController.remove(i)}
              moveQuestionUp={() => listController.moveUp(i)}
              moveQuestionDown={() => listController.moveDown(i)}
            />
          ))}
        </ol> */}
      {/* </div> */}
    </Container>
  );
}
