import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div>
      Admin
      <button
        onClick={() => {
          navigate("/admin/newsurvey");
        }}
      >
        New Survey
      </button>
    </div>
  );
};

export default Admin;
