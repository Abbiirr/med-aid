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
  const [waitTime, setWaitTime] = useState(null);
  //use a variable to store the search query
  const [doctors, setDoctors] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  // const location = useLocation();
  // const value = queryString.parse(location.search);
  // const symptoms = value.symptoms;

  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );
  var role;
  const checkRole = (token) => {
    const decode = jwt_decode(token);
    role = decode.role;
    const id = decode.id;
    localStorage.setItem("id", id);

    // if (role === "super_admin" || role === "admin" || role === "manager") {
    //   return history.push("/admin");
    // }
    // if (role === "doctor") {
    //   return history.push("/doctor");
    // }

    // if (role === "patient") {
    //   return history.push("/patient");
    // }
    //console.log(role);
  };

  if (token) {
    checkRole(token);
  }

  //console.log(symptoms)

  let specialtyOptions = [];

  useEffect(() => {
    //search doctors
    //console.log(symptoms);
    const searchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/doctor/getDoctors"
        );
        response.data.forEach(function (item) {
          specialtyOptions.push({
            label: item.specialist,
            value: item.specialist,
          });
        });
        console.log(specialtyOptions);
        //console.log("All doctors: ", response.data);
        setDoctors(response.data);
        //console.log("All doctors from state : ", doctors);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchDoctors();
  }, []);

  let sortBy;
  const handleChange = () => {
    //load page
  };

  const submitSearch = () => {};

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
