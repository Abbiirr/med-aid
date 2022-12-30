import React, { useState, useEffect, useCallback, useForm } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import Icon from "react-icons-kit";
import jwt_decode from "jwt-decode";
import { ic_clear } from "react-icons-kit/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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
  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm({ mode: "onTouched" });
  const [councilHours, setCouncilHours] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [value, setValue] = useState(null);
  const [councilIDs, setCouncilIDs] = useState([]);
  const [day, setDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [councilStartTime, setCouncilStartTime] = useState(null);
  const [councilEndTime, setCouncilEndTime] = useState(null);
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
    schedule: null,
  });

  //---fetching council time data
  // let day;
  // let startTime;
  let endTime;

  //----------------------------------------------------------------

  const getCouncilHours = async (councilHourID) => {
    try {
      const response = await axios.get(
        `${apiURL}/doctor/councils/${councilHourID}`
        // header
      );



      //don't touch this code block, please it might break :(
      console.log(response.data.requests[0].schedule);
      const schedule = response.data.requests[0].schedule;
      console.log(schedule.day, schedule.startTime, schedule.endTime);
      setCouncilHours((councilHours) => councilHours.concat(schedule));
      councilHours.push(response.data.requests[0].schedule);

      if (response.status === 200 || response.status === 304) {
        console.log("Council hours are found ");
      }
    } catch (error) {
      if (error) {
        // setLoading(false);
        console.log("Council hours are not found ");
        console.log(error.response);
      }
    }
  };

  const getCouncilIDs = useCallback(async () => {
    try {
      console.log("id is " + id);
      const response = await axios.get(
        `${apiURL}/doctor/${id}/councils/`

        // header
      );
      // setCouncilIDs(response.data);  //does not work

      // console.log(response.data.length);
      for (var i = 0; i < response.data.length; i++) {
        await councilIDs.push(response.data[i]);
        await getCouncilHours(councilIDs[i]);
      }
      console.log(councilIDs);

      if (response.status === 200 || response.status === 304) {
        console.log("Council IDs are found ");
      }
    } catch (error) {
      if (error) {
        // setLoading(false);
        console.log("Council IDs are not found ");
        console.log(error.response);
        // console.log("Response is: " + error.status);
      }
    }
  }, [id]);
  useEffect(() => {
    getCouncilIDs();

    // console.log("Outside then: " + councilIDs.length);
  }, [councilIDs]);

  // console.log(councilHours);
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

  const handleValueChange1 = (newValue) => {
    setValue(newValue);
    setStartDate(newValue);
    const day2 = new Date(newValue);
    setDay(day2.getDate());
    console.log("From DateInput inside show : " + day2.getDate());
    // console.log("From DateInput inside show : " + newValue);
    document.getElementById("get-appointment").disabled = false;
  };

  // Handle appointment
  const handleAppointment = () => {
    if (token) {
      const patient = checkRole(token);
      if (patient) {
        console.log(id);
        setShowAppointment({
          status: true,
          doctorId: id,
          schedule: { day, startTime },
        });
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

  const options = [];
  // obj = {};
  const splitTime = 15;

  var start;

  const convertTimeToNumber = (time) => {
    var [hour, minute] = time.split(":");
    var value = parseInt(hour) * 60 + parseInt(minute);
    console.log(value);
    return value;
  };

  const createTimeOptions = (start, end) => {
    const startT = convertTimeToNumber(start) / 15;
    const endT = Math.ceil(convertTimeToNumber(end) / 15);

    console.log(endT);
    // convertTimeToNumber(end);
    for (var i = startT; i < 96 - endT + startT; i++) {
      var obj = {};

      var time = i * splitTime;
      var [hour, minute] = [Math.floor(time / 60), Math.ceil(time % 60)];
      var amOrPm = "AM";

      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      // if(hour<10 && minute<10)
      obj["value"] = `${hour}:${minute}`;

      //checking if am or pm
      if (hour >= 12) amOrPm = "PM";

      //if pm transform to 12 hr format
      if (amOrPm === "PM") hour = hour % 12;
      if (hour == 0) hour = 12;

      obj["label"] = `${hour}:${minute} ${amOrPm}`;

      options.push(obj);
    }
  };
  // createTimeOptions("00:00");

  function createData(day, startTime, endTime) {
    return { day, startTime, endTime };
  }

  var rows = [];
  var appSchedule = {
    day: null,
    startTime: null,
  };

  const updayRows = () => {
    console.log("Updating rows");
    for (var i = 0; i < councilHours.length; i++) {
      // setCouncilStartTime(councilHours[i].startTime);
      // setCouncilEndTime(councilHours[i].endTime);
      createTimeOptions(councilHours[i].startTime, councilHours[i].endTime);
      rows.push(
        createData(
          councilHours[i].day,
          councilHours[i].startTime,
          councilHours[i].endTime
        )
      );
    }
  };

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
              // onChange={handleValueChange1}
              handleValueChange={handleValueChange1}
              placeholderText={"Select a Date"}
            ></DateInput>
            <br />
            {/* <div className="col-12 col-lg-4">
              <select id="time-slot" className="form-control shadow-none">
                <option value="saturday">Select Time Slot</option>
              </select>
            </div> */}

            <button
              id="get-appointment"
              type="button"
              className="btn shadow-none"
              onClick={handleAppointment}
              disabled={startDate == null ? true : false}
            >
              Get Appointment
            </button>
          </div>

          {/* Schedule */}
          <div className="mt-3">
            <h6 className="mb-2">Councilling Schedule</h6>
            {councilIDs.length > 0 ? updayRows() : null}
            <TableContainer
              component={Paper}
              sx={{ marginBottom: 10 }}
              style={{ width: "auto", tableLayout: "auto" }}
            >
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.day}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.day}
                      </TableCell>
                      <TableCell align="center">{row.startTime}</TableCell>
                      <TableCell align="center">{row.endTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-12 col-lg-4">
            <p>Start time</p>

            <select
              name="startTime"
              id="start-time"
              className="form-control shadow-none"
              onChange={(e) => {
                setStartTime(e.target.value);
                console.log("Start time", startTime);
              }}
            >
              {options.map(({ value, label }, index) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {(appSchedule = { day, startTime }) ? console.log(appSchedule) : null}
      {showAppointment.status ? (
        <AppointmentModal
          doctor={showAppointment.doctorId}
          schedule={appSchedule}
          hidemodal={() =>
            setShowAppointment({ status: false, doctorId: null })
          }
        />
      ) : null}
    </div>
  );
};

export default Index;
