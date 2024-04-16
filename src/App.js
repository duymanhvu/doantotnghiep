import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AOS from 'aos';

import Layout from "./components/Layout";
import Login from "./scenes/auth/LoginForm";
import ForgotPass from "./scenes/auth/ForgotPass";
import Registration from "./scenes/auth/RegistrationForm";
import RegistrationAccommodation from "./scenes/auth/RegistrationAccommodation";
import Home from "./scenes/home/Home";
import Local from "./scenes/local/Local";
import Message from "./scenes/message/Message";
import Overview from "./scenes/overview/Overview";
import Photos from "./scenes/photos/Photos";
import Program from "./scenes/program/Program";
import Tour from "./scenes/tour/Tour";
import Contact from "./scenes/contact/Contact";
import Parent from "./components/project/parent/Parent";
import AuthContextProvider from "./contexts/AuthContext";
import Speakers from "./scenes/speakers/Speakers";
import Student from "./components/project/student/Student";
import Teacher from "./components/project/teacher/Teacher";
function App() {
  AOS.init();
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPass />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration:id" element={<Registration />} /> */}
            <Route path="/registrationAccommodation" element={<RegistrationAccommodation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/local" element={<Local />} />
            <Route path="/message" element={<Message />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/program" element={<Program />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Route>
          <Route path="/test" element={<Registration />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/student" element={<Student />} />

        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
