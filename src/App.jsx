import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import TaskLogic from "./components/TaskLogic";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<TaskLogic />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
