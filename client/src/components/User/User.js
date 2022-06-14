import React, { useEffect, useState } from "react";
import { Container, Card, Form, FormControl, Button } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const User = () => {
  return (
    <Container>
      <Navigate />
      <h2>Welcome to User page</h2>
      <input placeholder="Enter Survey ID"></input>
      <button>Take Survey</button>
    </Container>
  );
};

export default User;
