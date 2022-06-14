import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const ViewSubmission = () => {
  const surveyID = useParams();
  //   const [sID, setSID] = useState("");
  const [surveyDetails, setSurveyDetails] = useState([]);

  useEffect(() => {
    const getSubmissionList = () => {
      Axios.get(`http://localhost:3001/user/getSubmission/${surveyID.id}`).then(
        (res) => {
          setSurveyDetails(res.data);
        }
      );
    };
    getSubmissionList();
  }, [surveyDetails]);

  return (
    <Container>
      <Navigate />
      <h2>Survey ID: {surveyID.id}</h2>
      <br />
      <br />
      <h5>User List:</h5>

      {surveyDetails.length > 0 ? (
        <ListGroup>
          {surveyDetails.map((val) => {
            return <ListGroup.Item>{val.username}</ListGroup.Item>;
          })}
        </ListGroup>
      ) : (
        <p>No submissions yet!</p>
      )}
    </Container>
  );
};

export default ViewSubmission;
