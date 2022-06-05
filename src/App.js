import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import SignIn from "./Pages/Auth/SignIn/SignIn";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import Admin from "./Pages/Admin/Admin/Admin";
import ManageDoctors from "./Pages/Admin/ManageDoctors/ManageDoctors";
import DashBoard from "./Pages/Admin/DashBoard/DashBoard";
import AddDoctor from "./Pages/Admin/AddDoctor/AddDoctor";
import AddService from "./Pages/Admin/AddService/AddService";
import ManageServices from "./Pages/Admin/ManageServices/ManageServices";
import AddHospital from "./Pages/Admin/AddHospital/AddHospital";
import ManageHospitals from "./Pages/Admin/ManageHospitals/ManageHospitals";
import ManageReviews from "./Pages/Admin/ManageReviews/ManageReviews";
import ManageAppoinments from "./Pages/Admin/ManageAppoinments/ManageAppoinments";
import Profile from "./Pages/Auth/Profile/Profile";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import PrivateOutlet from "./PrivateOutlet/PrivateOutlet";
import MakeAdmin from "./Pages/Admin/MakeAdmin/MakeAdmin";
import ManageUsers from "./Pages/Admin/ManageUsers/ManageUsers";
import NoMatch from "./Shared/NoMatch/NoMatch";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="admin" element={<Admin />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="appoinments" element={<ManageAppoinments />} />
          <Route path="addDoctor" element={<AddDoctor />} />
          <Route path="addService" element={<AddService />} />
          <Route path="addHospital" element={<AddHospital />} />
          <Route path="manageServices" element={<ManageServices />} />
          <Route path="manageDoctors" element={<ManageDoctors />} />
          <Route path="manageHospitals" element={<ManageHospitals />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="makeAdmin" element={<MakeAdmin />} />
          <Route path="manageUsers" element={<ManageUsers />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
