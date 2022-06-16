import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  Badge,
  FormControl,
  Card,
  Form,
} from "react-bootstrap";
import Navigate from "../Navigate";

import axios from "axios";

const User = () => {
  const [surveyID, getSurveyID] = useState("");
  const [sID, setSID] = useState("");
  // const [surveyDetails, setSurveyDetails] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");

  const [allQ, setAllQ] = useState([]);
  const [allQC, setAllQC] = useState({});

  const [username, setUsername] = useState("");
  // const [currentQ, setCurrentQ] = useState(null);
  // const [currentChoices, setCurrentChoices] = useState([]);
  // const [qNum, setQNum] = useState(0);

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
      // setSurveyDetails(sData.data);
      setSurveyName(sData.data[0].name);
      setSurveyDesc(sData.data[0].description);
    };
    getSurveyDetails(sID);
  }, [sID]);

  useEffect(() => {
    if (allQ.length === 0) return;

    const getAllQCs = async (sid, qid) => {
      const { data } = await axios.get(
        `http://localhost:3001/admin/getAllQchoices/${sid}/${qid}`
      );
      return data;
    };

    allQ.forEach(async (el) => {
      let data = await getAllQCs(sID, el.qId);
      setAllQC((prev) => {
        return {
          ...prev,
          [el.qId]: data,
        };
      });
    });
  }, [allQ]);

  // useEffect(() => {
  //   console.log("qc: ", allQC);
  // }, [allQC]);

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

  // console.log(surveyName);
  // console.log(allQ);
  // console.log(surveyDetails[0].name);
  // console.log(surveyName, surveyDesc);

  console.log(allQ);
  // console.log(allQC);

  return (
    <Container>
      <Navigate />
      <Stack className="newsurvey-h" direction="horizontal">
        <div>
          <FormControl
            placeholder="Enter Username"
            aria-label="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="ms-auto">
          <Stack direction="horizontal">
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
                if (!username) {
                  alert("Please enter username!");
                } else {
                  e.preventDefault();
                  setSID(surveyID);
                  getSurveyID("");
                }
              }}
            >
              Attempt
            </Button>
          </Stack>
        </div>
      </Stack>
      <br />
      <div className="user-page">
        <div className="w-25 fixed">
          {surveyName && surveyDesc ? (
            <Stack>
              <h6>You are attempting the survey:</h6>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{surveyName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {sID}
                  </Card.Subtitle>
                  <Card.Text>{surveyDesc}</Card.Text>
                </Card.Body>
              </Card>
            </Stack>
          ) : (
            <></>
          )}
        </div>

        <Stack direction="horizontal">
          <div>
            <br />
            <Stack>
              <ol>
                <div className="q-body">
                  {allQ.map((q) => (
                    <div className="q-main">
                      <li>
                        <Stack>
                          <div className="q-type">
                            <label>{q.question}</label>
                            <Badge pill bg="secondary">
                              {q.type}
                            </Badge>
                          </div>
                          <br />
                          <div className="q-sub">
                            <ol type="a">
                              {allQC[q.qId]?.map((qc) => (
                                <li>{qc.cQuestion}</li>
                              ))}
                            </ol>
                          </div>

                          <br />
                        </Stack>
                      </li>
                    </div>
                  ))}
                </div>
              </ol>
            </Stack>
          </div>
          {/* <Button>Submit</Button> */}
        </Stack>
      </div>
      {/*{currentQ && (
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
      </Stack> */}
    </Container>
  );
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

export default User;
