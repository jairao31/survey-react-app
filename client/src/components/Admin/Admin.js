import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState([]);

  const getSurveyList = () => {
    Axios.get("http://localhost:3001/admin/").then((res) => {
      setSurveyList(res.data);
    });
  };
  console.log(Object.values(surveyList));
  // useEffect(() => {
  //   // getSurveyList();
  // }, [surveyList]);

  return (
    <div>
      <h2>Welcome to Admin page</h2>
      <button
        onClick={() => {
          navigate("/admin/newsurvey");
        }}
      >
        New Survey
      </button>
      <h3>Survey List:</h3>
      <button onClick={getSurveyList}>Show Survey List</button>
      <div>{surveyList}</div>
    </div>
  );
};

export default Admin;
