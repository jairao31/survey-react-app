import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Navigate from "../Navigate";


import axios from "axios";

const User = () => {
  const [surveyID, getSurveyID] = useState("");
  const [sID, setSID] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");

  const [allQ, setAllQ] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [qNum, setQNum] = useState(0);

  const inventoryOpt = ["A Novice", "A Practitioner", "An Expert", "A Leader"];
  const likertOpt = [
    "Not At All Like Me",
    "Not Very Like Me",
    "A Little Like Me",
    "Somewhat Like Me",
    "Very Like Me",
  ];

  useEffect(() => {
    if (!sID || sID.trim().length === 0) return;

    const getSurvey = async (id) => {
      const { data } = await axios.get(
        `http://localhost:3001/admin/getAllQuestions/${id}`
      );
      setAllQ(data);
    };
    getSurvey(sID);

    const getSurveyDetails = async (id) => {
      const sData = await axios.get(
        `http://localhost:3001/admin/getSurveyDetailsByID/${id}`
      );
      setSurveyName(sData.data.name);
      setSurveyDesc(sData.data.description);
    };
    getSurveyDetails(sID);
  }, [sID]);

  // useEffect(() => {
  //   // if (!surveyName || surveyName.trim().length === 0 || !surveyDesc || surveyDesc.trim().length === 0) return;
  //   if (!sID || sID.trim().length === 0) return;
  //   const getSurveyDetails = async (id) => {
  //     const { sData } = await axios.get(
  //       `http://localhost:3001/admin/getSurveyDetailsByID/${id}`
  //     );
  //     setSurveyDetails(sData);
  //   };
  //   getSurveyDetails(sID);
  // }, [sID]);

  // useEffect(() => {
  //   if (allQ.length === 0) return;
  //   const getQuestion = async () => {
  //     const { data } = await axios.get(
  //       `http://localhost:3001/admin/getAllQchoices/${allQ[qNum].surveyId}/${allQ[qNum].qId}`
  //     );
  //     setCurrentChoices(data);
  //   };
  //   setCurrentQ(allQ[qNum]);
  //   getQuestion();
  // }, [qNum, allQ]);

  // const getSurveyDetails = (id) => {};

  console.log(surveyName);
  console.log(allQ);

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
      <br />
      <Stack direction="horizontal">
        <Stack>
          <h3>Survey Name: {surveyName}</h3>
          <h5>Survey ID: {sID}</h5>
          <p>Description: {surveyDesc}</p>
        </Stack>
      </Stack>

      {currentQ && (
        <div>
          <p>{currentQ.question}</p>
          {(currentQ.type === "Likert" || currentQ.type === "Inventory") && (
            <select>
              {currentQ.type === "Likert" ? (
                <>
                  {likertOpt.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {inventoryOpt.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </>
              )}
            </select>
          )}
          {currentQ.type === "Multiple" &&
            currentChoices.map((i, idx) => (
              <div key={idx}>
                <input type="checkbox" id={i.cId} name={i.cId} value={i.cId} />
                <label htmlFor={i.cId}>{i.cQuestion}</label>
                <br></br>
              </div>
            ))}
        </div>
      )}
      <Stack direction="horizontal">
        {qNum !== 0 && (
          <button onClick={() => setQNum((prev) => prev - 1)}>Prev</button>
        )}
        {qNum !== allQ.length - 1 && (
          <button onClick={() => setQNum((prev) => prev + 1)}>Next</button>
        )}
      </Stack>
    </Container>
  );
};;;;;;;;;;;;;

export default User;
