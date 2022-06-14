import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Card, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import Admin from "./components/Admin/Admin";
import NewSurvey from "./components/Admin/NewSurvey";

import User from "./components/User/User";

function App() {
  // return <div className="App">This is homepage</div>;

  return (
    <Container>
      <div className="App">
        <Router>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="App-body">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/newsurvey" element={<NewSurvey />} />

              <Route path="/user" element={<User />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Container>
  );
}

export default App;
