import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Likert from "react-likert-scale";
import {
  Button,
  Container,
  ListGroup,
  Stack,
  Card,
  Badge,
  Form,
} from "react-bootstrap";
import Navigate from "../Navigate";

import axios from "axios";

const UserSurveySubmission = () => {
  const data = useParams();
  const sID = data.sId;
  const uID = data.uId;

  const [userName, setUserName] = useState("");
  const [ans, setAns] = useState([]);

  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");
  const [allQ, setAllQ] = useState([]);
  const [allQC, setAllQC] = useState({});

  useEffect(() => {
    if (!uID) return;
    const getUserName = async (uid) => {
      const userN = await axios.get(
        `http://localhost:3001/admin/getUsername/${uid}`
      );
      setUserName(userN.data[0].username);
      // console.log(userN.data[0].username);
    };
    getUserName(uID);
  }, [sID]);

  useEffect(() => {
    if (!sID) return;
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

  useEffect(() => {
    // if (!uID && !sID) return;
    const getAnswerList = async (sid, uid) => {
      const ansData = await axios.get(
        `http://localhost:3001/admin/getAnswerByUser/${sid}/${uid}`
      );
      console.log(ansData.data);
      // return ansData;
      setAns(ansData.data);
    };
    getAnswerList(sID, uID);
  }, [sID, uID]);

  useEffect(() => {
    // console.log(surveyName);
    // console.log(surveyDesc);
    // console.log(allQ);
    // console.log(ans);
    // console.log(allQC);
  });
  // const array1 = [5, 12, 8, 130, 44];

  // const found = array1.find(element => element > 10);

  // console.log(found);
  // expected output: 12

  // const checkAns = async (arr, qID, cID) => {
  //   const found = arr.find(
  //     (el) => el.questionId === qID && el.cQuestionId === cID
  //   );
  //   if (!found) {
  //     return false;
  //   }
  //   return found;

  // };

  const inventoryOpt = ["A Novice", "A Practitioner", "An Expert", "A Leader"];
  const likertOpt = [
    "Not At All Like Me",
    "Not Very Like Me",
    "A Little Like Me",
    "Somewhat Like Me",
    "Very Like Me",
  ];

  const isChecked = (index, ans, arr) => {
    return arr[index] === ans;
  };

  return (
    <Container>
      <Navigate />
      <div className="user-page">
        <div className="w-25 fixed">
          {surveyName && surveyDesc ? (
            <Stack>
              {/* <br /> */}
              <h6>
                <b>{userName}'s</b> response for:
              </h6>
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
        <Stack direction="horizontal">
          <Stack direction="w-75 horizontal">
            <br />
            <div className="qmain-body">
              <Stack>
                <ol>
                  <div className="q-body">
                    {allQ.map((q, index) => (
                      <Container key={index}>
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
                                    {allQC[q.qId]?.map((qc, index) => (
                                      <li key={index}>
                                        <Form.Check
                                          type="checkbox"
                                          id={qc.cId}
                                          checked={
                                            ans.find(
                                              (i) => i.cQuestionId === qc.cId
                                            )?.answer
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
                                                    {
                                                      value: 0,
                                                      text: "🤥",
                                                      checked: isChecked(
                                                        0,
                                                        ans.find(
                                                          (i) =>
                                                            i.cQuestionId ===
                                                            qc.cId
                                                        )?.answer,
                                                        inventoryOpt
                                                      ),
                                                    },
                                                    {
                                                      value: 1,
                                                      text: "😄",
                                                      checked: isChecked(
                                                        1,
                                                        ans.find(
                                                          (i) =>
                                                            i.cQuestionId ===
                                                            qc.cId
                                                        )?.answer,
                                                        inventoryOpt
                                                      ),
                                                    },
                                                    {
                                                      value: 2,
                                                      text: "🧐",
                                                      checked: isChecked(
                                                        2,
                                                        ans.find(
                                                          (i) =>
                                                            i.cQuestionId ===
                                                            qc.cId
                                                        )?.answer,
                                                        inventoryOpt
                                                      ),
                                                    },
                                                    {
                                                      value: 3,
                                                      text: "😎",
                                                      checked: isChecked(
                                                        3,
                                                        ans.find(
                                                          (i) =>
                                                            i.cQuestionId ===
                                                            qc.cId
                                                        )?.answer,
                                                        inventoryOpt
                                                      ),
                                                    },
                                                  ]}
                                                  disabled={true}
                                                />
                                              </div>
                                              {/* <br /> */}
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                      {/* {allQC[q.qId]?.map((qc, index) => (
                                        <div className="inventory" key={index}>
                                          <div>
                                            <li>{qc.cQuestion}</li>
                                          </div>
                                          <div className="inventory-opt">
                                            <Likert
                                              id={qc.cId}
                                              responses={[
                                                {
                                                  value: 0,
                                                  checked: isChecked(
                                                    0,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    inventoryOpt
                                                  ),
                                                },
                                                {
                                                  value: 1,
                                                  checked: isChecked(
                                                    1,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    inventoryOpt
                                                  ),
                                                },
                                                {
                                                  value: 2,
                                                  checked: isChecked(
                                                    2,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    inventoryOpt
                                                  ),
                                                },
                                                {
                                                  value: 3,
                                                  checked: isChecked(
                                                    3,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    inventoryOpt
                                                  ),
                                                },
                                              ]}
                                              disabled={true}
                                            />
                                          </div>
                                        </div>
                                      ))} */}
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
                                        {likertOpt.map((i, index) => (
                                          <label key={index}>{i}</label>
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
                                                  {
                                                    value: 0,
                                                    text: "👿",
                                                    checked: isChecked(
                                                      0,
                                                      ans.find(
                                                        (i) =>
                                                          i.cQuestionId ===
                                                          qc.cId
                                                      )?.answer,
                                                      likertOpt
                                                    ),
                                                  },
                                                  {
                                                    value: 1,
                                                    text: "😑",
                                                    checked: isChecked(
                                                      1,
                                                      ans.find(
                                                        (i) =>
                                                          i.cQuestionId ===
                                                          qc.cId
                                                      )?.answer,
                                                      likertOpt
                                                    ),
                                                  },
                                                  {
                                                    value: 2,
                                                    text: "🤔",
                                                    checked: isChecked(
                                                      2,
                                                      ans.find(
                                                        (i) =>
                                                          i.cQuestionId ===
                                                          qc.cId
                                                      )?.answer,
                                                      likertOpt
                                                    ),
                                                  },
                                                  {
                                                    value: 3,
                                                    text: "😛",
                                                    checked: isChecked(
                                                      3,
                                                      ans.find(
                                                        (i) =>
                                                          i.cQuestionId ===
                                                          qc.cId
                                                      )?.answer,
                                                      likertOpt
                                                    ),
                                                  },
                                                  {
                                                    value: 4,
                                                    text: "😎",
                                                    checked: isChecked(
                                                      4,
                                                      ans.find(
                                                        (i) =>
                                                          i.cQuestionId ===
                                                          qc.cId
                                                      )?.answer,
                                                      likertOpt
                                                    ),
                                                  },
                                                ]}
                                                disabled
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      {/* {allQC[q.qId]?.map((qc, index) => (
                                        <div className="inventory" key={index}>
                                          <li>{qc.cQuestion}</li>
                                          <div className="inventory-opt">
                                            <Likert
                                              id={qc.cId}
                                              responses={[
                                                {
                                                  value: 0,
                                                  checked: isChecked(
                                                    0,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    likertOpt
                                                  ),
                                                },
                                                {
                                                  value: 1,
                                                  checked: isChecked(
                                                    1,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    likertOpt
                                                  ),
                                                },
                                                {
                                                  value: 2,
                                                  checked: isChecked(
                                                    2,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    likertOpt
                                                  ),
                                                },
                                                {
                                                  value: 3,
                                                  checked: isChecked(
                                                    3,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    likertOpt
                                                  ),
                                                },
                                                {
                                                  value: 4,
                                                  checked: isChecked(
                                                    4,
                                                    ans.find(
                                                      (i) =>
                                                        i.cQuestionId === qc.cId
                                                    )?.answer,
                                                    likertOpt
                                                  ),
                                                },
                                              ]}
                                              disabled
                                            />
                                          </div>
                                        </div>
                                      ))} */}
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
        </Stack>
      </div>
    </Container>
  );
};;;;;;

export default UserSurveySubmission;
