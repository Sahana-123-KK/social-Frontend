import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        {localStorage.getItem("socialuser") &&
          localStorage.getItem("socialjwt") && <Navbar />}
        <Routes>
          {/* <Route element={<Navbar />} /> */}
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
