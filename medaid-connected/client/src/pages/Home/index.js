import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiURL } from "../../utils/apiURL";
import { Images } from "../../utils/Images";
//import { FaHeartbeat } from "@react-icons/all-files/fa/FaHeartbeat";


import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorListComponent from "../../components/User/DoctorsList/index";
import FooterComponent from "../../components/User/Footer/index";

const Index = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);

    //fetch Doctors
  // const fetchDoctors = async () => {
  //   try {
  //     const response = await axios.get(`${apiURL}/doctor/getDoctors`);
  //     setDoctor(response.data.doctor);
  //     setLoading(false);
  //   } catch (error) {
  //     if (error) console.log(console.response);
  //   }
  // };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      alert("Geoloacation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setLoading(false)
    //fetchDoctors();
    //console.log(doctor);
  }, []);


  return (
    <>
      <div className="home">
        <NavbarComponent />
        <div className="header py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 content d-none d-lg-block">
                <h1>Search your Symptoms</h1>
                <h5>Choose your nearest specialist</h5>
              </div>
              <div className="col-12 col-lg-6 image-column text-center">
                <img src={Images.PeopleSearch} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <SearchComponent />,
        {/* Nearest or suggested Doctor */}
        <div className="suggested-doctors">
          <div className="container mb-4">
            <div className="row">
              <div className="col-12 text-center">
                <h2>Nearest Doctors</h2>
              </div>
            </div>
          </div>

          {/* <DoctorListComponent doctors={doctor} loading={isLoading} /> */}
        </div>
        {/* service  */}
        <div className="service">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 text-center text-lg-left content">
                <h1>We Connect and Care</h1>
                <h3>Easy HealthCare</h3>

                <Link
                  to="/contact-us"
                  type="button"
                  className="btn shadow-none"
                >
                  Contact Us
                </Link>
              </div>
              <div className="col-12 col-lg-6 text-center text-lg-left mt-4 mt-lg-0">
                <img src={Images.Service} className="img-fluid" alt="..." />
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <FooterComponent />
      </div>
    </>
  );
};

export default Index;
