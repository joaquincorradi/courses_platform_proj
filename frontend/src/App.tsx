import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import Dashboard from "./pages/Dashboard";
import EditCourse from "./pages/EditCourse";
import CreateCourse from "./pages/CreateCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editcourse/:id" element={<EditCourse />} />
        <Route path="/createcourse" element={<CreateCourse />} />"
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
