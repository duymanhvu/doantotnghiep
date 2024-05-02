import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AOS from "aos";

import CreateAccount from "./components/CreateAccount/components/CreateAccount";
import Layout from "./components/Layout";
import { CalendarSchedule } from "./components/project/calendar";
import ClassRoom from "./components/project/classroom/ClassRoom";
import Parent from "./components/project/parent/Parent";
import Student from "./components/project/student/Student";
import Subject from "./components/project/subject/Subject";
import Teacher from "./components/project/teacher/Teacher";
import AuthContextProvider from "./contexts/AuthContext";
import CreateAccountjs from "./scenes/auth/CreatAc";
import LoginForm from "./scenes/auth/LoginForm";
import RegistrationAccommodation from "./scenes/auth/RegistrationAccommodation";
import Contact from "./scenes/contact/Contact";
import Home from "./scenes/home/Home";
import Local from "./scenes/local/Local";
import Message from "./scenes/message/Message";
import Overview from "./scenes/overview/Overview";
import Photos from "./scenes/photos/Photos";
import Program from "./scenes/program/Program";
import Tour from "./scenes/tour/Tour";
function App() {
  AOS.init();
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPass />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration:id" element={<Registration />} /> */}
            <Route
              path="/registrationAccommodation"
              element={<RegistrationAccommodation />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/local" element={<Local />} />
            <Route path="/message" element={<Message />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/program" element={<Program />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/speakers" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/test" element={<CreateAccount/>} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/student" element={<Student />} />
          <Route path="/calendar" element={<CreateAccountjs />} />
          <Route path="/subject" element={<Subject/>} />
          <Route path="/classroom" element={<ClassRoom/>} />
          <Route path="/calender" element={<CalendarSchedule/>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
