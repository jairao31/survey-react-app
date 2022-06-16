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
    <Container className="border mx-5">
      <br />
      <Stack gap={3}>
        <Form>
          {editing ? (
            <QuestionForm question={question} setQuestion={setQuestion} />
          ) : (
            <>
              <Stack>
                <div>
                  {/* <h5></h5> */}
                  <Form.Label>{question.text}</Form.Label>
                </div>
              </Stack>
              {question.hasOptions &&
                question.options.map((option, i) => (
                  // <Stack direction="horizontal" key={i}>
                  //   <input
                  //     type={question.inputType}
                  //     id={option}
                  //     name={option}
                  //     value={option}
                  //     disabled
                  //   />

                  //   {option}
                  <Form.Group className="mb-3">
                    <Form.Check
                      type={question.inputType}
                      id={option}
                      name={option}
                      value={option}
                      disabled
                      label={option}
                    />
                  </Form.Group>
                  // </Stack>
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
      <br />
    </Container>
  );
}

