import React from "react";

const NewSurvey = () => {
  return (
    <div>
      NewSurvey
      <input placeholder="Survey Name" />
      <input placeholder="Survey ID" />
      <button>New MCQ Question</button>
      <button>New Inventory Question</button>
      <button>New Likert Question</button>
    </div>
  );
};

export default NewSurvey;
