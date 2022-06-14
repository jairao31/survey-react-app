import React from "react";
import { Link } from "react-router-dom";
import Navigate from "./Navigate";

const Homepage = () => {
  return (
    <div>
      <Navigate />
      <br />
      <br />
      <br />
      <div className="homepage">
        <Link className="adminLink" to="/admin">
          <h2>Admin</h2>
        </Link>
        <br />
        <Link className="userLink" to="/user">
          <h2>User</h2>
        </Link>
        <br />
      </div>
    </div>
  );
};

export default Homepage;
