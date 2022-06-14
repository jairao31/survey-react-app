import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, FormControl, Button } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState([]);

  useEffect(() => {
    const getSurveyList = () => {
      Axios.get("http://localhost:3001/admin/").then((res) => {
        setSurveyList(res.data);
      });
    };
    getSurveyList();
  }, [surveyList]);

  const deleteSurvey = (id) => {
    Axios.delete(`http://localhost:3001/admin/deleteSurvey/${id}`).then(
      (res) => {
        alert(`Survey ${id} deleted Successfully!`);
      }
    );
  };

  return (
    <Container>
      <Navigate />
      <h2>Welcome to Admin page</h2>
      <Button
        onClick={() => {
          navigate("/admin/newsurvey");
        }}
      >
        New Survey
      </Button>
      <h3>Survey List:</h3>
      {/* <Button onClick={getSurveyList}>Show Survey List</Button> */}
      <div className="survey-list">
        {surveyList.map((val, key) => {
          return (
            <Card>
              <Card.Header as="h5">ID: {val.id}</Card.Header>
              <Card.Body>
                <Card.Title>{val.name}</Card.Title>
                <Card.Text>{val.description}</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button onClick={() => deleteSurvey(val.id)} variant="danger">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};;;;

export default Admin;
