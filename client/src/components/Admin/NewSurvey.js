import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Navigate from "../Navigate";

const NewSurvey = () => {
  const [surveyID, setSurveyID] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");
  console.log(surveyID, surveyName, surveyDesc);
  return (
    <Container>
      <Navigate />
      <h2>New Survey</h2>

      <div>
        <div className="survey-details">
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
                rows={3}
                onChange={(e) => {
                  setSurveyDesc(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        <br />
        <div>
          <Button>✚ MCQ Question</Button> <Button>✚ Inventory Question</Button>{" "}
          <Button>✚ Likert Question</Button>
        </div>
        <br />
      </div>
    </Container>
  );
};

export default NewSurvey;
