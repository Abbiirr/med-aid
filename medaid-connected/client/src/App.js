import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/index";
import HomeIndex from "./pages/Home/index";
import AboutIndex from "./pages/About/index";
import ContentIndex from "./pages/Contact/index";
//import SearchResultIndex from "./pages/SearchResult/index";
import SearchResultIndex from "./components/SearchResult/index";
// //Auth
import LoginIndex from "./pages/Auth/Login/index";
//import EmailVerify from "./pages/Auth/EmailVerify/index";
import RegisterIndex from "./pages/Auth/Register/index";
import ResetIndex from "./pages/Auth/Reset/index";
import AdminLogin from "./pages/Auth/Admin/Login";

import AllDoctors from "./pages/AllDoctors/doctorPage";
import Symptoms from "./pages/Symptoms/symptoms";
import Medicine from "./pages/medicine/medicinePage";
import DiagnosticCenter from "./pages/DiagnosticCenter/diagnosticPage";
import MapPage from "./pages/MapPage/mapPage";
import Appointments from "./pages/Appointments/appointmentPage";

import Prescription from "./components/Prescription/prescriptionForm";
import DynamicQueue from "./pages/QueuePage/queuePage";
import DoctorDynamicQueue from "./pages/QueuePage/doctorQueuePage";

// //Account
import DoctorAccountMaster from "./pages/Account/Doctor/Master/index";
import PatientAccountMaster from "./pages/Account/Patient/Master/index";
import AdminMaster from "./pages/Account/Admin/Master/index";
import PrivateRoute from "./components/PrivateRoute/index";

import FourOFour from "./pages/FourOFour/index";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomeIndex} />
            <Route exact path="/about-us" component={AboutIndex} />
            <Route exact path="/contact-us" component={ContentIndex} />
            <Route exact path="/search" component={SearchResultIndex} />
            {/* <Route exact path="/:id/verify/:token" element={<EmailVerify />} /> */}
            <Route exact path="/login" component={LoginIndex} />
            <Route exact path="/register" component={RegisterIndex} />
            <Route exact path="/reset" component={ResetIndex} />
            <Route exact path="/admin-login" component={AdminLogin} />
            <Route exact path="/doctors" component={AllDoctors} />
            <Route exact path="/symptoms" component={Symptoms} />
            <Route exact path="/medicine" component={Medicine} />
            <Route exact path="/diagnostic" component={DiagnosticCenter} />
            <Route exact path="/appointment" component={Appointments} />
            <Route exact path="/prescription" component={Prescription} />
            <Route exact path="/map" component={MapPage} />
            <Route exact path="/dynamicQueue" component={DynamicQueue} />
            <Route
              exact
              path="/doctorDynamicQueue"
              component={DoctorDynamicQueue}
            />

            {/* Doctor Master */}
            <PrivateRoute path="/doctor" role="doctor">
              <DoctorAccountMaster />
            </PrivateRoute>

            {/* Patient Master */}
            <PrivateRoute path="/patient" role="patient">
              <PatientAccountMaster />
            </PrivateRoute>

            {/* Council Master */}
            {/* <Route exact path="/messages/:reciverId/:appointmentId"> */}
            {/* <Route exact path="/messages">
              <ChatIndex />
            </Route> */}

            {/* Admin Master */}
            {/* <PrivateRoute exact path="/admin" role="super_admin">
              <AdminMaster />
            </PrivateRoute> */}

            <PrivateRoute exact path="/admin" role="admin">
              <AdminMaster />
            </PrivateRoute>

            {/* <PrivateRoute exact path="/admin" role="manager">
              <AdminMaster />
            </PrivateRoute> */}
            {/* <Route path="/admin" role="admin">
             <AdminMaster />
           </Route> */}

            <Route path="*" component={FourOFour} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
