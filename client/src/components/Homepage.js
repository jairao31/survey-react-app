import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";
import { Container, Stack, Image } from "react-bootstrap";
import bgimage from "../background.svg";
import Navigate from "./Navigate";

const Homepage = () => {
  return (
    <Container>
      <Navigate />
      <h1>Welcome to Build-A-Survey 😄</h1>
      <br />
      <div className="homepage">
        <Stack className="col-md-6 mx-auto">
          <Stack direction="horizontal">
            <div className="w-25 p-3">
              <Image src={bgimage} alt="No Image" width="500" height="500" />
            </div>
            <div className="ms-auto">
              <Link className="adminLink" to="/admin">
                <h2>Admin</h2>
              </Link>
              <br />
              <Link className="userLink" to="/user">
                <h2>User</h2>
              </Link>
              <br />
            </div>
          </Stack>
        </Stack>
      </div>
    </Container>
  );
};

export default Homepage;
