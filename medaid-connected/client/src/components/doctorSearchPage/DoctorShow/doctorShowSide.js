import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import Icon from "react-icons-kit";
import jwt_decode from "jwt-decode";
import { ic_clear } from "react-icons-kit/md";
import AppointmentModal from "../../User/Model/GetAppointment/index";
import AlertModal from "../../User/Model/Alert/AuthCheck/index";
import axios from "axios";
import { Images } from "../../../utils/Images";
import { apiURL } from "../../../utils/apiURL";

import DateInput from "../../Reusable/DateInput";

const MyContext = React.createContext();
//import doctorlist and use doctor
//use that variable to get the query and use it[] in getDoctors
const Index = ({ show, doctor }) => {
  //console.log(doctor);
  const [councilHours, setCouncilHours] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [value, setValue] = useState(null);
  let thisDoctor = {
    id: doctor._id,
    name: doctor.name,
    image: doctor.image,
    college: doctor.college,
    currentHospital: doctor.currentHospital,
    councilHour: doctor.councilHour,
    thisCouncilHourId: doctor.councilHour,
    thisCouncilHour: councilHours,
  };
  let id = doctor._id;
  const token = localStorage.getItem("token");
  const [isAuth, setAuth] = useState({ message: null, status: false });
  const [showAppointment, setShowAppointment] = useState({
    status: false,
    doctorId: null,
  });

  //---fetching council time data
  let day;
  let startTime;
  let endTime;

  //----------------------------------------------------------------

  useEffect(() => {
    const getCouncilHours = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/doctor/councils/${thisDoctor.thisCouncilHourId}`

          // header
        );

        //console.log(response.data.requests[0].schedule);
        // day = response.data.requests[0].schedule.day;
        // startTime = response.data.requests[0].schedule.startTime;
        // endTime = response.data.requests[0].schedule.endTime;

        if (response.status === 200) {
          console.log("Council hours are found ");

          setCouncilHours(response.data.requests[0].schedule);
          //setCouncilHours(response.data.results);
          // console.log(councilHours);
          // setLoading(false);
          //console.log(councilHours);
        }
      } catch (error) {
        if (error) {
          // setLoading(false);
          console.log("Council hours are not found ");
          console.log(error.response);
        }
      }
    };
    getCouncilHours();
  }, []);

  // const getCouncilHours = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiURL}/doctor/councils/${thisDoctor.thisCouncilHourId}`

  //       // header
  //     );

  //     //console.log(response.data.requests[0].schedule);
  //     // day = response.data.requests[0].schedule.day;
  //     // startTime = response.data.requests[0].schedule.startTime;
  //     // endTime = response.data.requests[0].schedule.endTime;

  //     if (response.status === 200) {
  //       console.log("Council hours are found ");

  //       setCouncilHours(response.data.requests[0].schedule);
  //       //setCouncilHours(response.data.results);
  //       // console.log(councilHours);
  //       // setLoading(false);
  //       //console.log(councilHours);
  //     }
  //   } catch (error) {
  //     if (error) {
  //       // setLoading(false);
  //       console.log("Council hours are not found ");
  //       console.log(error.response);
  //     }
  //   }
  // }, [thisDoctor.thisCouncilHourId]);
  // getCouncilHours();

  // useEffect(() => {
  //   getCouncilHours();
  // }, []);

  // const [doctor, setDoctor] = useState();
  console.log(councilHours);
  // Role check
  const checkRole = (token) => {
    const decode = jwt_decode(token);
    const role = decode.role;
    if (role === "patient") return true;
    return false;
  };

  //------------ this portion is confusing----

  const getDoctors = async () => {
    // GET request using axios with error handling
    const response = await axios.get(
      "http://localhost:4000/api/v1/doctor/getDoctors"
    );
    // console.log(response);
  };

  doctor = getDoctors();

  //------------ this portion is confusing-----

  // Handle appointment
  const handleAppointment = () => {
    if (token) {
      const patient = checkRole(token);
      if (patient) {
        console.log(id);
        setShowAppointment({ status: true, doctorId: id });
      } else {
        setAuth({
          message:
            "You are not patient, please create a patient account to get all services. Thank you",
          status: true,
        });
      }
    } else {
      setAuth({
        message: "Please logged in first to access all services. Thank you",
        status: true,
      });
    }
  };

  // Check Patient auth
  if (isAuth.status) {
    return (
      <AlertModal
        message={isAuth.message}
        hide={() => setAuth({ message: null, status: false })}
      />
    );
  }

  function handleValueChange(newValue) {
    setValue(newValue);
    setStartDate(newValue);
    console.log("From DateInput inside show : ", value);
    document.getElementById("get-appointment").disabled = false;
  }

  return (
    <div className="doctor-show shadow">
      <div className="info-container p-3">
        <div className="header">
          <button
            type="button"
            className="btn btn-light p-1 shadow-none rounded-circle"
            onClick={show}
            //onClick={getDoctors}
          >
            <Icon icon={ic_clear} size={30} />
          </button>
        </div>

        {/* Body */}
        <div className="body pt-3">
          {/* Basic Info */}
          <div className="text-center">
            <div className="img-box rounded-circle">
              {doctor.image ? (
                <img src={doctor.image} className="img-fluid" alt="..." />
              ) : (
                <img src={Images.Doctor} className="img-fluid" alt="..." />
              )}
            </div>
            <br />
            <h5 className="mb-0 text-capitalize">{doctor.name}</h5>
            <p className="text-capitalize mb-0">
              {thisDoctor.specialist}
              {/* Nothing */}
            </p>
            <p className="text-capitalize">{thisDoctor.college}</p>
            {/* <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} /> */}
          </div>
          {/* Current Hospital */}
          <div className="mt-3">
            <h6 className="mb-0">Current Hospital</h6>
            <p>{thisDoctor.currentHospital}</p>
          </div>
          {/* Schedule */}
          <div className="mt-3">
            <h6 className="mb-2">Councilling Schedule</h6>
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start time</th>
                  <th>End time</th>
                </tr>
              </thead>
              <tbody>
                {thisDoctor.councilHour
                  ? console.log(thisDoctor.councilHour._id)
                  : console.log("Doctor not found")}
                {/* {thisDoctor.councilHour &&
                  thisDoctor.councilHour.map((item) => (
                    <tr>
                      <td key={item._id}>
                        {item.schedule.day ? item.schedule.day : "nothing"}
                      </td>
                    </tr>
                  ))} */}
                {/* {
                  ((item, i) => (
                    <tr key={item._id}>
                      <th>{item.schedule.day}</th>
                      <th>{item.schedule.startTime}</th>
                      <th>{item.schedule.endTime}</th>
                    </tr>
                  ))} */}
                <tr>
                  <td>{councilHours.day}</td>
                  <td>{councilHours.startTime}</td>
                  <td>{councilHours.endTime}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ////////////////// Council Fee goes to here /////////////////// */}
          {/* <div className="mt-3">
                        <h6 className="mb-0">Councilling Fee</h6>
                        <p>100 tk.</p>
                    </div> */}

          <div className="my-3 text-center">
            {/* <MyContext.Consumer>
              <DateInput />
              {(value) => console.log("Date value from DateInput", value)}
            </MyContext.Consumer> */}
            <DateInput
              onChange={handleValueChange}
              placeholderText={"Get Appointment"}
            ></DateInput>

            <button
              id="get-appointment"
              type="button"
              className="btn shadow-none"
              onClick={handleAppointment}
            >
              Get Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showAppointment.status ? (
        <AppointmentModal
          doctor={showAppointment.doctorId}
          hidemodal={() =>
            setShowAppointment({ status: false, doctorId: null })
          }
        />
      ) : null}
    </div>
  );
};

export default Index;
