import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const UserSurveySubmission = () => {
  const data = useParams();
  const sID = data.sId;
  const uID = data.uId;

  useEffect(() => {
    // console.log(data);
  });

  return (
    <Container>
      <Navigate />
      {/* <h1>{sID}</h1>

      <h1>{uID}</h1> */}
    </Container>
  );
};

export default UserSurveySubmission;
