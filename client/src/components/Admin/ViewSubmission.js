import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import Navigate from "../Navigate";

import Axios from "axios";

const ViewSubmission = () => {
  const surveyID = useParams();
  //   const [sID, setSID] = useState("");
  const [surveyDetails, setSurveyDetails] = useState([]);
  const navTo = useNavigate();
  useEffect(() => {
    const getSubmissionList = () => {
      Axios.get(`http://localhost:3001/user/getSubmission/${surveyID.id}`).then(
        (res) => {
          setSurveyDetails(res.data);
        }
      );
    };
    getSubmissionList();
    console.log(surveyDetails);
  }, [surveyDetails]);

  return (
    <Container>
      <Navigate />
      <h2>Survey ID: "{surveyID.id}"</h2>
      <br />
      <br />
      <h5>
        <u>User List:</u>
      </h5>
      <br />
      {surveyDetails.length > 0 ? (
        <Stack gap={2}>
          {surveyDetails.map((val) => {
            return (
              <Stack direction="horizontal" gap={2}>
                <ListGroup.Item className="w-100">
                  {val.username}

                  <Button
                    className="v-button"
                    onClick={() => {
                      navTo(`/admin/viewsurvey/${surveyID.id}/${val.uId}`);
                    }}
                  >
                    View
                  </Button>
                </ListGroup.Item>
              </Stack>
            );
          })}
        </Stack>
      ) : (
        <p>No submissions yet!</p>
      )}
    </Container>
  );
};

export default ViewSubmission;
