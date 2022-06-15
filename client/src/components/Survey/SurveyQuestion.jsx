import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import styled from "styled-components";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

export default function SurveyQuestion({
  question,
  setQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown,
}) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <Container className="bg-light border mx-auto">
      <Stack gap={2}>
        <Form>
          {editing ? (
            <QuestionForm question={question} setQuestion={setQuestion} />
          ) : (
            <>
              <Stack>
                <div>
                  <h5>{question.text}</h5>
                </div>
              </Stack>
              <p>{question.inputType}</p>
              {question.hasOptions &&
                question.options.map((option, i) => (
                  <Stack key={i}>
                    <input
                      type={question.inputType}
                      id={option}
                      name={option}
                      value={option}
                      disabled
                    />
                    {option}
                  </Stack>
                ))}
            </>
          )}
          <br />
          <Button onClick={toggleEditing}>
            {editing ? <>Save</> : <>Edit</>}
          </Button>{" "}
          <Button onClick={removeQuestion}>Delete</Button>{" "}
          <Button onClick={moveQuestionUp}>▲</Button>{" "}
          <Button onClick={moveQuestionDown}>▼</Button>{" "}
        </Form>
      </Stack>
    </Container>
  );
}

// const QuestionField = styled.li`
//   margin-top: 1em;
//   border-top: #ddd solid 1.5px
//   padding-bottom: 1.5em;
// `;

// const Button = styled.button`
//   margin: 0.3em;
// `;
