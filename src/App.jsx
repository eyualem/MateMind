// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import ChooseCoach from "./screens/ChooseCoach";
import ModeSelector from "./screens/ModeSelector";
import TestMode from "./screens/TestMode";
import PracticeMode from "./screens/PracticeMode";
import TestMatch from "./screens/TestMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/choose-tutor" element={<ChooseCoach />} />
      <Route path="/mode" element={<ModeSelector />} />
      <Route path="/test" element={<TestMode />} />
      <Route path="/practice" element={<PracticeMode />} />
      <Route path="/test-match" element={<TestMatch />} />
    </Routes>

    
  );
}

export default App;
