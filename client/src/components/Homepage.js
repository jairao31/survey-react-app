import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import bgimage from "../background.svg";
import Navigate from "./Navigate";

const Homepage = () => {
  return (
    <div>
      <Navigate />
      <h1>Welcome to Online Survey Generator</h1>
      <br />
      <br />
      <br />
      <div className="homepage">
        <div className="homepage-left">
          <Link className="adminLink" to="/admin">
            <h2>Admin</h2>
          </Link>
          <br />
          <Link className="userLink" to="/user">
            <h2>User</h2>
          </Link>
          <br />
        </div>
        <div className="homepage-right">
          <Image src={bgimage} alt="No Image" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
