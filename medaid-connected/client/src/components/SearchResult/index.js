import React, { useEffect, useState } from "react";
import axios from "axios";
//import { apiURL } from "../../utils/apiURL";
import queryString from 'query-string'
import { useLocation } from 'react-router';

import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorsListComponent from "../../components/User/DoctorsList/index";
import FooterComponent from "../../components/User/Footer/index";

//http://localhost:4000/api/v1/patient/findDoctors?symptoms=sneezing

const Index = () => {
  //use a variable to store the search query
  const [doctors, setDoctors] = useState([]);

  const location = useLocation();
  const value=queryString.parse(location.search);
  const symptoms=value.symptoms;
  //console.log(symptoms)

  useEffect(() => {
    //search doctors
    //console.log(symptoms)
    const searchDoctors = async () => {
      try {
        const response = await axios.get(
         `http://localhost:4000/api/v1/patient/findDoctors?symptoms=${symptoms}` 
        );
        setDoctors(response.data);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchDoctors();
  }, [symptoms]);


  return (
    <div>
      <NavbarComponent />

      <div className="search-result-index">
        <div className="container">
          <div className="row">
            <div className="col-12 py-4">
              <SearchComponent />
            </div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Found {doctors ? doctors.length : null} doctors.
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        <DoctorsListComponent doctors={doctors} loading={false} />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
