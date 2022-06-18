import React, { useEffect, useState } from "react";
import Likert from "react-likert-scale";
import {
  Container,
  Stack,
  Button,
  Badge,
  FormControl,
  Card,
  Form,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import Navigate from "../Navigate";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const User = () => {
  const navigate = useNavigate();

  const [surveyID, getSurveyID] = useState("");
  const [sID, setSID] = useState("");
  // const [surveyDetails, setSurveyDetails] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");

  const [allQ, setAllQ] = useState([]);
  const [allQC, setAllQC] = useState({});

  const [username, setUsername] = useState("");
  const [answers, setAnswers] = useState([]);
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

  const handleSetAnswers = (array, answer, qID, cId) => {
    let ans = answer;
    // console.log(ans);
    let exist = false;
    if (array) {
      ans = array[answer.value];
      // console.log(ans);
      exist = answers.find((i) => i.qID === qID && i.cId === cId);
      if (exist) {
        setAnswers((prev) => {
          return prev.map((i) =>
            i.qID === qID && i.cId === cId ? { qID, cId, answer: ans } : i
          );
        });
      } else {
        setAnswers((prev) => {
          return [
            ...prev,
            {
              qID,
              cId,
              answer: ans,
            },
          ];
        });
      }
    } else {
      exist = answers.find(
        (i) => i.qID === qID && i.cId === cId && i.answer === ans
      );
      // console.log(exist);///
      if (exist) {
        setAnswers((prev) => {
          return prev.filter((i) => i.cId !== cId);
        });
      } else {
        setAnswers((prev) => {
          return [
            ...prev,
            {
              qID,
              cId,
              answer: ans,
            },
          ];
        });
      }
    }
  };

  const handleSurveySubmit = async (sID) => {
    try {
      let submitedUID = await axios.post(
        `http://localhost:3001/user/submitSurvey/${sID}`,
        {
          username: username,
        }
      );
      // console.log(submitedUID);
      if (submitedUID) {
        await axios.post(
          `http://localhost:3001/user/createAnswer/${sID}/${submitedUID.data}`,
          { answers: answers }
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // console.log("qc: ", allQC);
  }, [allQC]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

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

  // console.log(allQ);
  // console.log(allQC);

  return (
    <Container>
      <Navigate />
      <Stack className="newsurvey-h" direction="horizontal">
        {/* <div className="u-input"> */}
        <InputGroup className="u-input">
          <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
          <Form.Control
            placeholder="enter here!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </InputGroup>
        <div className="ms-auto">
          <InputGroup>
            <Form.Control
              placeholder="Enter Survey ID"
              aria-label="Enter Survey ID"
              onChange={(e) => {
                getSurveyID(e.target.value);
              }}
              value={surveyID}
            />
            <Button
              variant="outline-primary"
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
            <Button
              variant="outline-primary"
              onClick={() => {
                setSID("");
                getSurveyID("");
                setSurveyName("");
                setSurveyDesc("");
                setAllQ([]);
                setAllQC([]);
              }}
            >
              X
            </Button>
          </InputGroup>
        </div>
      </Stack>
      <br />
      {/* ////////////// */}
      <div className="user-page">
        <div className="w-25 fixed">
          {surveyName && surveyDesc ? (
            <Stack>
              <br />
              <h6>You are attempting the survey:</h6>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{surveyName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ID: "{sID}"
                  </Card.Subtitle>
                  <br />
                  <Card.Text>{surveyDesc}</Card.Text>
                </Card.Body>
              </Card>
            </Stack>
          ) : (
            <></>
          )}
        </div>

        <Stack direction="w-75 horizontal">
          <div className="qmain-body">
            <br />
            <Stack>
              <ol>
                <div className="q-body">
                  {allQ.map((q) => (
                    <Container>
                      <Stack className="q-main">
                        <li>
                          <Stack>
                            <div className="q-type">
                              <label>
                                <b>{q.question}</b>
                              </label>
                              <Badge pill bg="secondary">
                                {q.type}
                              </Badge>
                            </div>
                            <br />

                            <div className="q-sub">
                              {q.type === "Multiple" ? (
                                <ol type="a">
                                  {allQC[q.qId]?.map((qc) => (
                                    <li>
                                      <Form.Check
                                        type="checkbox"
                                        id={qc.cId}
                                        onChange={(e) =>
                                          handleSetAnswers(
                                            null,
                                            e.target.value,
                                            q.qId,
                                            qc.cId
                                          )
                                        }
                                        name={qc.cQuestion}
                                        value={qc.cQuestion}
                                        label={qc.cQuestion}
                                      />
                                    </li>
                                  ))}
                                </ol>
                              ) : q.type === "Inventory" ? (
                                <div>
                                  <div className="II-opt">
                                    {/* ["A Novice", "A Practitioner", "An Expert", "A Leader"] */}
                                    <label>A Novice: 🤥</label>
                                    <label>A Practitioner: 😄</label>
                                    <label>An Expert: 🧐</label>
                                    <label>A Leader: 😎</label>
                                  </div>
                                  <ol type="a">
                                    <br />
                                    {allQC[q.qId]?.map((qc) => (
                                      <div>
                                        <div className="inventory">
                                          <div className="I-div">
                                            <br />
                                            <div className="LI-opt">
                                              <li>{qc.cQuestion}</li>
                                            </div>

                                            <div className="LI-size">
                                              <Likert
                                                id={qc.cId}
                                                responses={[
                                                  { value: 0, text: "🤥" },
                                                  { value: 1, text: "😄" },
                                                  { value: 2, text: "🧐" },
                                                  { value: 3, text: "😎" },
                                                ]}
                                                onChange={(val) =>
                                                  handleSetAnswers(
                                                    inventoryOpt,
                                                    val,
                                                    q.qId,
                                                    qc.cId
                                                  )
                                                }
                                              />
                                            </div>
                                            {/* <br /> */}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </ol>
                                </div>
                              ) : (
                                <div>
                                  <div className="I-opt">
                                    <div className="L-emoji">
                                      <label>
                                        <small>Not At All Like Me:</small>
                                      </label>
                                      <label>
                                        <small>Not Very Like Me:</small>
                                      </label>
                                      <label>
                                        <small>A Little Like Me:</small>
                                      </label>
                                      <label>
                                        <small>Somewhat Like Me:</small>
                                      </label>
                                      <label>
                                        <small>Very Like Me:</small>
                                      </label>
                                    </div>
                                    <div className="L-emoji">
                                      <label>👿</label>
                                      <label>😑</label>
                                      <label>🤔</label>
                                      <label>😛</label>
                                      <label>😎</label>
                                    </div>
                                  </div>
                                  <ol type="a">
                                    <br />
                                    {/* <div className="inventory-static">
                                      {likertOpt.map((i) => (
                                        <label>{i}</label>
                                      ))}
                                    </div> */}
                                    {allQC[q.qId]?.map((qc) => (
                                      <div className="inventory">
                                        <div className="I-div">
                                          <br />
                                          <li>{qc.cQuestion}</li>
                                          <div className="inventory-opt">
                                            <Likert
                                              id={qc.cId}
                                              responses={[
                                                { value: 0, text: "👿" },
                                                { value: 1, text: "😑" },
                                                { value: 2, text: "🤔" },
                                                { value: 3, text: "😛" },
                                                { value: 4, text: "😎" },
                                              ]}
                                              onChange={(val) =>
                                                handleSetAnswers(
                                                  likertOpt,
                                                  val,
                                                  q.qId,
                                                  qc.cId
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {/* <ol type="a">
                                {allQC[q.qId]?.map((qc) => (
                                  <li>{qc.cQuestion}</li>
                                ))}
                              </ol> */}
                            </div>
                          </Stack>
                        </li>
                      </Stack>
                    </Container>
                  ))}
                </div>
              </ol>
            </Stack>
          </div>
        </Stack>
      </div>
      <div className="u-submit">
        {surveyName && surveyDesc ? (
          <Button
            className="b-survey"
            onClick={async () => {
              const result = handleSurveySubmit(sID);
              if (result) {
                alert(
                  `Survey "${surveyName}" successfully submitted for username "${username}"`
                );
                setSID("");
                getSurveyID("");
                setSurveyName("");
                setSurveyDesc("");
                setAllQ([]);
                setAllQC([]);
                // setUsername("");
                setAnswers([]);
              } else {
                alert(`Survey could not be submitted for ${username}`);
              }
            }}
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
      </div>
      <br /> <br /> <br />
    </Container>
  );
};

export default User;

{
  /* <div className="ms-auto">
          <Stack direction="horizontal" gap={1}>
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
            <br />
          </Stack>
        </div> */
}

{
  /*{currentQ && (
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
      </Stack> */
}