import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AOS from "aos";

import CreateAccount from "./components/CreateAccount/components/CreateAccount";
import Layout from "./components/Layout";
import { CalendarSchedule } from "./components/project/calendar/index";
import ClassRoom from "./components/project/classroom/ClassRoom";
import Parent from "./components/project/parent/Parent";
import Student from "./components/project/student/Student";
import Subject from "./components/project/subject/Subject";
import Teacher from "./components/project/teacher/Teacher";
import AuthContextProvider from "./contexts/AuthContext";
import CreateAccountjs from "./scenes/auth/CreatAc";
import LoginForm from "./scenes/auth/LoginForm";
import RegistrationAccommodation from "./scenes/auth/RegistrationAccommodation";
import Home from "./scenes/home/Home";
import Local from "./scenes/local/Local";
import Message from "./scenes/message/Message";
import Overview from "./scenes/overview/Overview";
import Photos from "./scenes/photos/Photos";
import Program from "./scenes/program/Program";
import Tour from "./scenes/tour/Tour";
import ThoiKhoaBieu from "./components/project/thoiKhoaBieu/thoiKhoaBieu";
import { CalendarScheduleNew } from "./components/project/calendar/allcalendar";
import { LichHocCaNhan } from "./components/project/calendar/LichHocCaNhan";
import ChaCon from "./components/project/student/ChaCon";
import { ExportContentMoDau } from "./components/CreateAccount/creactContentInfo";
import { LichDayCuaThay } from "./components/project/calendar/LichHocCuaThay";
import DanhSachHS from "./components/project/thoiKhoaBieu/danhSachHS";
function App() {
  AOS.init();
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            {/* <Route path="/forgot" element={<ForgotPass />} /> */}

            {/* <Route path="/registration:id" element={<Registration />} /> */}
            <Route path="/registrationAccommodation" element={<RegistrationAccommodation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/local" element={<Local />} />
            <Route path="/message" element={<Message />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/program" element={<LichHocCaNhan />} />
            <Route path="/concuaban" element={<ChaCon />} />
            <Route path="/lichcuathay" element={<LichDayCuaThay />} />
            <Route path="/contact" element={<CalendarScheduleNew />} />
            <Route path="/speakers" element={<ThoiKhoaBieu />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/student" element={<Student />} />
            <Route path="/calendar" element={<CalendarSchedule />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/classroom" element={<ClassRoom />} />
            <Route path="/calender" element={<CalendarSchedule />} />
            <Route path="/danhsachhs" element={<DanhSachHS />} />
          </Route>
          <Route path="/registration" element={<CreateAccountjs />} />
          <Route path="/test" element={<CreateAccount />} />

          <Route path="/thanhcong" element={<ExportContentMoDau />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
