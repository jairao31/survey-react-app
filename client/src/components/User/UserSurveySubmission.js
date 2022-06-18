import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  ListGroup,
  Stack,
  Card,
  Badge,
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

  const checkAns = async (arr, qID, cID) => {
    const found = arr.find(
      (el) => el.questionId === qID && el.cQuestionId === cID
    );
  };

  return (
    <Container>
      <Navigate />
      <Stack direction="horizontal">
        <div className="w-25 fixed">
          {surveyName && surveyDesc ? (
            <Stack>
              <br />
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

        <Stack direction="w-75 horizontal">
          <br />
          <div className="qmain-body">
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
                                  {/* {allQC[q.qId]?.map((qc) => {
                                    {


                                    }
                                  })} */}
                                  {/* <li>answer here</li> */}
                                </ol>
                              ) : (
                                <></>
                              )}
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
    </Container>
  );
};;;;;;

export default UserSurveySubmission;
