import React, { useState } from "react";

const NewSurvey = () => {
  const [surveyID, setSurveyID] = useState("");
  return (
    <div>
      <h2>New Survey</h2>

      <div>
        <div>
          <input placeholder="Survey ID" />
          <br />
          <input placeholder="Survey Name" />
          <br />
          <textarea placeholder="Survey Description" />
        </div>
        <br />
        <div>
          <button>New MCQ Question</button>
          <button>New Inventory Question</button>
          <button>New Likert Question</button>
        </div>
        <br />
        <form>
          <textarea placeholder="Enter Question" />
        </form>
      </div>
    </div>
  );
};

export default NewSurvey;
