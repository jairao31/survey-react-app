import React, { useState } from "react";
import Question from "../Models/Question";
import ListController from "../Controllers/ListController";
import styled from "styled-components";

import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";

export default function QuestionForm({ question, setQuestion }) {
  function handleChangeText(e) {
    setQuestion(question.merge({ text: e.target.value }));
  }

  function handleChangeType(e) {
    setQuestion(question.merge({ type: e.target.value }));
  }

  function setOptions(options) {
    setQuestion(question.merge({ options }));
  }

  const listController = new ListController(question.options, setOptions);

  return (
    <Container className="bg-light border mx-auto">
      <Stack>
        <Form.Label>
          <h5>Question</h5>
        </Form.Label>
        <Form.Control
          type="text"
          value={question.text}
          onChange={handleChangeText}
        />
        <br />
        <Form.Label>
          <h5>Question Type</h5>
        </Form.Label>
        <Form.Select
          id="question-type"
          value={question.type}
          onChange={handleChangeType}
        >
          {Object.values(Question.TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Select>
        <br />
        {question.hasOptions && (
          <fieldset>
            <Form.Label>
              <h5>Options</h5>
            </Form.Label>

            {question.options.map((option, i) => (
              <Form.Group className="mb-3" controlId="New-Q">
                <Stack direction="horizontal" gap={1}>
                  <Form.Control
                    type="text"
                    placeholder="Enter option"
                    name={option}
                    value={option}
                    onChange={(e) => listController.set(i, e.target.value)}
                  />
                  <Button onClick={() => listController.moveUp(i)}>▲</Button>{" "}
                  <Button onClick={() => listController.moveDown(i)}>▼</Button>{" "}
                  <Button onClick={() => listController.remove(i)}>X</Button>{" "}
                </Stack>
              </Form.Group>
            ))}
            <p>
              <Button onClick={() => listController.add("")}>
                ✚ Add Option
              </Button>
            </p>
          </fieldset>
        )}
      </Stack>
    </Container>
  );
}

// const Option = styled.div`
//   display: flex;
// `;

// const Buttons = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;

// const Button = styled.button`
//   background: none;
//   color: #0366ee;
//   margin-left: 0.2em;
// `;
