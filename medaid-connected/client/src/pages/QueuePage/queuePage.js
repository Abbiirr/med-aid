import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";

import MainSelect from "react-select";

import jwt_decode from "jwt-decode";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorsListComponent from "../../components/User/DoctorsList/index";
import FooterComponent from "../../components/User/Footer/index";

//http://localhost:4000/api/v1/patient/findDoctors?symptoms=sneezing

const Index = () => {
  const [waitTime, setWaitTime] = useState(20);

  useEffect(() => {}, []);
  {
    console.log("reload time");
  }

  setTimeout(function () {
    setWaitTime(waitTime - 1);
    // window.location.reload(1);
    console.log("reloaded");
  }, 1000);

  //   setWaitTime(20);
  console.log(waitTime);

  return (
    <div>
      <NavbarComponent />
      <div className="search-result-index">
        <div className="container">
          {/* <div style={{ display: "flex", float: "right" }}>
            <Button style={{ marginLeft: "auto" }}>
              Pending Doctor Approvals
            </Button>
          </div> */}

          <div className="row">
            <div className="col-12 py-4"></div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Your remaining waiting time is: {waitTime}
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
