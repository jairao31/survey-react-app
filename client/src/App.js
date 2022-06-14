import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Admin from "./components/Admin/Admin";
import NewSurvey from "./components/Admin/NewSurvey";

import User from "./components/User/User";

function App() {
  // return <div className="App">This is homepage</div>;

  return (
    <div>
      <Router>
        <h1>Survey Generator</h1>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/newsurvey" element={<NewSurvey />} />

          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
