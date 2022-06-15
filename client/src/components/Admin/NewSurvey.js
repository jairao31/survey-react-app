import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";
import Navigate from "../Navigate";
import MCQ from "./MCQ";

const NewSurvey = () => {
  const [surveyID, setSurveyID] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");

  const [mcq, setMCQ] = useState(false);

  const inventoryOpt = ["A Novice", "A Practitioner", "An Expert", "A Leader"];
  const likertOpt = [
    "Not At All Like Me",
    "Not Very Like Me",
    "A Little Like Me",
    "Somewhat Like Me",
    "Very Like Me",
  ];

  return (
    <Container>
      <Navigate />
      <Stack className="newsurvey-h" direction="horizontal">
        <h2>New Survey</h2>
        <div className="ms-auto">
          <Button
            onClick={() => {
              setMCQ(true);
            }}
          >
            ✚ MCQ Question
          </Button>{" "}
          <Button>✚ Likert Question</Button>{" "}
          <Button>✚ Inventory Question</Button>
        </div>
      </Stack>
      <br />
      <Stack direction="horizontal" gap={3}>
        <div>
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
          {mcq ? (
            <div className="q-div">
              <MCQ />
            </div>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default NewSurvey;
