import React, { useState } from "react";
import styled from "styled-components";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

export default function SurveyDetails({
  surveyID,
  setSurveyID,
  surveyName,
  setSurveyName,
  surveyDesc,
  setSurveyDesc,
}) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <Container>
      {/* <Stack>
        <div className="bg-light border">First item</div>
        <div className="bg-light border">Second item</div>
        <div className="bg-light border">Third item</div>
      </Stack> */}
      {/* <Title>
        <Heading> */}
      <Stack direction="horizontal">
        <div>
          {editing ? (
            // <input type="text" value={title} onChange={handleChangeTitle} />
            <Form>
              <Form.Group className="mb-3" controlId="survey-name">
                <Form.Control
                  type="text"
                  value={surveyName}
                  onChange={setSurveyName}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="survey-id">
                <Form.Control
                  type="text"
                  value={surveyID}
                  onChange={setSurveyID}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="survey-desc">
                <Form.Control
                  as="textarea"
                  value={surveyDesc}
                  rows={5}
                  onChange={setSurveyDesc}
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <h2>{surveyName}</h2>
              <h4>{surveyID}</h4>
              <p>{surveyDesc}</p>
            </div>
          )}
        </div>
        <div className="ms-auto">
          <Button onClick={toggleEditing}>
            {editing ? <>📂 Save</> : <>✏️ Edit</>}
          </Button>
        </div>
      </Stack>

      {/* </Heading> */}

      {/* </Title> */}
    </Container>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  flex: 1 0;
  margin-right: 0.3em;
`;
