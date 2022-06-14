import React, { useEffect, useState } from "react";
import { Container, Card, Form, FormControl, Button } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const User = () => {
  return (
    <Container>
      <Navigate />
      <h2>User page</h2>
      <input placeholder="Enter Survey ID"></input>
      <Button>Take Survey</Button>
    </Container>
  );
};

export default User;
