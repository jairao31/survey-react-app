import React, { useState } from "react";
import Question from "../Models/Question";
import ListController from "../Controllers/ListController";
import styled from "styled-components";

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Stack,
  InputGroup,
} from "react-bootstrap";

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
    <Container>
      <Stack>
        {/* <Form.Label>
          <h5>Question</h5>
        </Form.Label> */}
        <Form.Control
          type="text"
          value={question.text}
          onChange={handleChangeText}
        />
        {/* <InputGroup className="mb-3">
          <Form.Control
            id="q-input"
            placeholder="Enter Question"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type="text"
            value={question.text}
            onChange={handleChangeText}
          />
          <Button variant="outline-primary" id="button-addon2">
            Button
          </Button>
        </InputGroup> */}
        <br />
        <Stack direction="horizontal" gap={3}>
          <Form.Label>Type</Form.Label>
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
        </Stack>

        <br />

        {question.hasOptions && (
          <fieldset>
            {/* <Form.Label>
              <h5>Options</h5>
            </Form.Label> */}
            <ol type="a">
              {question.options.map((option, i) => (
                <li>
                  <Form.Group className="mb-3" controlId="New-Q">
                    <Stack direction="horizontal" gap={1}>
                      <Form.Control
                        type="text"
                        placeholder="Enter option"
                        name={option}
                        value={option}
                        onChange={(e) => listController.set(i, e.target.value)}
                      />
                      <Button onClick={() => listController.moveUp(i)}>
                        ▲
                      </Button>{" "}
                      <Button onClick={() => listController.moveDown(i)}>
                        ▼
                      </Button>{" "}
                      <Button onClick={() => listController.remove(i)}>
                        X
                      </Button>{" "}
                    </Stack>
                  </Form.Group>
                </li>
              ))}
            </ol>
            <p>
              <Button
                disabled={!question.hasOptions}
                onClick={() => listController.add("")}
              >
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
