import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Stack, FormControl, Button } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState([]);
  const navTo = useNavigate();

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

  const handleOnClick = (id) => {
    navTo(`/admin/viewsurvey/${id}`);
  };

  return (
    <Container>
      <Navigate />
      <Stack direction="horizontal" gap={3}>
        <div>
          <h2>Admin page</h2>
        </div>
        <div className="ms-auto">
          <Button
            onClick={() => {
              navigate("/admin/newsurvey");
            }}
          >
            ✚ New Survey
          </Button>
        </div>
      </Stack>
      <br />
      <h4>Survey List:</h4>
      <br />

      {surveyList.length > 0 ? (
        <div className="survey-list">
          <Stack gap={5}>
            {surveyList.map((val, key) => {
              return (
                <Card>
                  <Card.Header as="h5">ID: {val.id}</Card.Header>
                  <Card.Body>
                    <Card.Title>{val.name}</Card.Title>
                    <Card.Text>{val.description}</Card.Text>
                    <Button
                      variant="success"
                      onClick={() => handleOnClick(val.id)}
                    >
                      View Submissions
                    </Button>{" "}
                    <Button variant="primary">Edit</Button>{" "}
                    <Button
                      onClick={() => deleteSurvey(val.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Stack>
        </div>
      ) : (
        <p>The List is empty!</p>
      )}
    </Container>
  );
};;;;

export default Admin;
