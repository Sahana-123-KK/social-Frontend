import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/home" element={<Profile type="mine" />} />{" "}
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
