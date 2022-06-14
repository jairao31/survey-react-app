import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Navigate from "../Navigate";

const NewSurvey = () => {
  const [surveyID, setSurveyID] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");
  return (
    <Container>
      <Navigate />
      <h2>New Survey</h2>

      <div>
        <div className="survey-details">
          <Form>
            <Form.Group className="mb-3" controlId="survey-id">
              <Form.Control type="text" placeholder="Survey ID" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-name">
              <Form.Control type="text" placeholder="Survey Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="survey-desc">
              <Form.Control
                as="textarea"
                placeholder="Survey Description"
                rows={3}
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
