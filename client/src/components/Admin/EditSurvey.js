import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Stack, Form, Button } from "react-bootstrap";
import Navigate from "../Navigate";
import axios from "axios";

const EditSurvey = () => {
  const navigate = useNavigate();
  const data = useParams();
  const sID = data.sId;
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesc, setSurveyDesc] = useState("");

  useEffect(() => {
    if (!sID) return;

    const getSurveyDetails = async (id) => {
      const sData = await axios.get(
        `http://localhost:3001/admin/getSurveyDetailsByID/${sID}`
      );
      setSurveyName(sData.data[0].name);
      setSurveyDesc(sData.data[0].description);
    };
    getSurveyDetails(sID);
  }, [sID]);

  //   console.log(surveyName, surveyDesc);

  const onHandleSave = async (e) => {
    e.preventDefault();

    await axios.patch(`http://localhost:3001/admin/editSurvey/${sID}`, {
      name: surveyName,
      desc: surveyDesc,
    });
    alert(`Survey ${sID} updated Successfully!`);
    navigate("/admin");
  };

  return (
    <Container>
      <Navigate />
      <Stack direction="horizontal" gap={3}>
        <div>
          <h4>Survey ID: {sID}</h4>
        </div>
      </Stack>
      <br />
      <br />
      <br />
      <Form className="edit-form" onSubmit={onHandleSave}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Survey Name</Form.Label>
          <Form.Control
            type="text"
            value={surveyName}
            onChange={(e) => {
              setSurveyName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Survey Description</Form.Label>
          <Form.Control
            as="textarea"
            value={surveyDesc}
            rows={5}
            onChange={(e) => {
              setSurveyDesc(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <div className="edit-btn">
          <Button
            variant="danger"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditSurvey;
