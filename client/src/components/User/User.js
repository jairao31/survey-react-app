import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const User = () => {
  const [surveyID, getSurveyID] = useState("");
  const [sID, setSID] = useState("");
  console.log(surveyID);

  return (
    <Container>
      <Navigate />
      <Stack className="newsurvey-h" direction="horizontal">
        <h2>User page</h2>
        <div className="ms-auto">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Survey ID"
              aria-label="Enter Survey ID"
              onChange={(e) => {
                getSurveyID(e.target.value);
              }}
              value={surveyID}
            />
            <Button
              variant="primary"
              id="button-addon2"
              onClick={(e) => {
                e.preventDefault();
                setSID(surveyID);
                getSurveyID("");
              }}
            >
              Take a survey
            </Button>
          </InputGroup>
        </div>
      </Stack>
    </Container>
  );
};

export default User;
