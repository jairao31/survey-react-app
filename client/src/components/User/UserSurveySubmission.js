import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Stack, Card } from "react-bootstrap";
import Navigate from "../Navigate";

import axios from "axios";

const UserSurveySubmission = () => {
  const data = useParams();
  const sID = data.sId;
  const uID = data.uId;

  const [userName, setUserName] = useState("");

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
      //   console.log(userN.data[0].username);
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
    // console.log(surveyName);
    // console.log(surveyDesc);
    // console.log(allQ);
    // console.log(allQC);
  });

  //   handleSurveyQ = async (sID) => {};

  return (
    <Container>
      <Navigate />

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
    </Container>
  );
};

export default UserSurveySubmission;
