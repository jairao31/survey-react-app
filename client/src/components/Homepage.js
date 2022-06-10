import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Link className="adminLink" to="/admin">
        Admin
      </Link>
      <br />
      <Link className="userLink" to="/user">
        User
      </Link>
      <br />
    </div>
  );
};

export default Homepage;
