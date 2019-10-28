import React from "react";
import ReactDOM from "react-dom";
import Assessment from "./components/assessment/assessment";
import { AssessmentProvider } from "./components/assessment/assessment-context";

function App() {
  console.log("App");
  return (
    <AssessmentProvider>
      <Assessment />
    </AssessmentProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
