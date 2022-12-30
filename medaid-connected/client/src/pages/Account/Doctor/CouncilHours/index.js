import React, { useEffect, useState, useCallback, useRef } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../../utils/apiURL";
import "react-datetime/css/react-datetime.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";

const CouncilHourUpdate = () => {
  const options = [];
  // obj = {};
  const splitTime = 15;

  var start;
  const [councilIDs, setCouncilIDs] = useState([]);
  const [councilHours, setCouncilHours] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );

  var role;
  // var id;
  const [id] = useState(localStorage.getItem("id"));
  const checkRole = (token) => {
    const decode = jwt_decode(token);
    role = decode.role;
    // id = decode.id;
    // localStorage.setItem("id", id);

    // if (role === "super_admin" || role === "admin" || role === "manager") {
    //   return history.push("/admin");
    // }
    // if (role === "doctor") {
    //   return history.push("/doctor");
    // }

    // if (role === "patient") {
    //   return history.push("/patient");
    // }
    // console.log(role);
  };

  // if (token) {
  //   checkRole(token);
  // }
  // checkRole(token);

  function createData(day, startTime, endTime) {
    return { day, startTime, endTime };
  }

  var rows = [];

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
  // console.log("Out of effect: " + councilIDs.length);

  const convertTimeToNumber = (time) => {
    var [hour, minute] = time.split(":");
    var value = parseInt(hour) * 60 + parseInt(minute);
    console.log(value);
    return value;
  };

  const createTimeOptions = (start) => {
    convertTimeToNumber(start);
    for (var i = 0; i < 96 - 0; i++) {
      var obj = {};

      var time = i * splitTime;
      var [hour, minute] = [Math.floor(time / 60), time % 60];
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
  createTimeOptions("00:00");

  const [value, onChange] = useState("10:00");

  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Is loading before setting true? : ", isLoading);
    try {
      console.log(id);
      console.log(data);

      setIsLoading(true);
      console.log("Is loading after setting true? : ", isLoading);
      const token = `token ${localStorage.getItem("token")}`;
      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/councils/update`,
        data,
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 204 || response.status === 200) {
        setIsLoading(false);
        // responsestep(5);
        console.log("Is loading after setting false? : ", isLoading);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    }
  };
  const updateRows = () => {
    console.log("Updating rows");
    for (var i = 0; i < councilHours.length; i++) {
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
    <div>
      <div>CouncilIDS {councilIDs.length}</div>
      <div>CouncilHours {councilHours.length}</div>
      {councilIDs.length > 0 ? updateRows() : null}
      <div>Rows {rows.length}</div>
      <TableContainer component={Paper} sx={{ marginBottom: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick>
                    {" "}
                    Remove{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="step">
        <div className="mb-4">
          <h6>Add Council hour</h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-2">
            <div className="col-12 col-lg-4">
              {errors.day && errors.day.message ? (
                <p className="text-danger">
                  {errors.day && errors.day.message}
                </p>
              ) : (
                <p>Day</p>
              )}
              <select
                name="day"
                {...register("day", {
                  required: "Day is required",
                })}
                className="form-control shadow-none"
              >
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
            </div>

            <div className="col-12 col-lg-4">
              {errors.startTime && errors.startTime.message ? (
                <p className="text-danger">
                  {errors.startTime && errors.startTime.message}
                </p>
              ) : (
                <p>Start time</p>
              )}
              <select
                name="startTime"
                {...register("startTime", {
                  required: "Start time is required",
                  onChange: () => {
                    start = getValues("startTime");
                    createTimeOptions(start);
                  },
                })}
                className="form-control shadow-none"
              >
                {options.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-lg-4">
              {errors.endTime && errors.endTime.message ? (
                <p className="text-danger">
                  {errors.endTime && errors.endTime.message}
                </p>
              ) : (
                <p>End time</p>
              )}
              {/* <input
              type="time"
              name="endTime"
              {...register("endTime", {
                required: "End time is required",
              })}
              className="form-control shadow-none"
            /> */}
              <select
                name="endTime"
                {...register("endTime", {
                  required: "End time is required",
                  validate: {
                    positive: () =>
                      convertTimeToNumber(getValues("endTime")) >
                        convertTimeToNumber(getValues("startTime")) ||
                      "End Time must be greater than Start Time",
                  },
                })}
                className="form-control shadow-none"
              >
                {options.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>
            {/* <DateTime timeConstraints={this.timeConstraints} /> */}

            <div className="col-12 text-right mt-3">
              <button
                type="submit"
                id="submit-btn"
                className="btn shadow-none"
                disabled={isLoading}
                onClick={onSubmit}
              >
                {isLoading ? <span>Please Wait...</span> : <span>Add</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouncilHourUpdate;

// import React, { useEffect, useState, useCallback } from "react";
// import "./style.scss";
// import axios from "axios";
// import { apiURL } from "../../../../utils/apiURL";

// import ManageScheduleModal from "../../../../components/Doctor/Model/ManageSchedule/index";
// import DataLoader from "../../../../components/DataLoader/index";

// const CouncilHourUpdate = () => {
//   const [show, setShow] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [requests, setRequests] = useState([]);
//   const [patient, setPatient] = useState(null);
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [id] = useState(localStorage.getItem("id"));
//   const [header] = useState({
//     headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//   });

//   // get all appointments requests
//   const getRequests = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `${apiURL}/doctor/appointment/${id}/requests`,
//         header
//       );
//       if (response.status === 200) {
//         setRequests(response.data.requests);
//         setLoading(false);
//       }
//     } catch (error) {
//       if (error) {
//         setLoading(false);
//         console.log(error.response);
//       }
//     }
//   }, [id, header]);

//   useEffect(() => {
//     getRequests();
//   }, [id, header, getRequests]);

//   // Hide Modal
//   const hideModal = () => setShow(false);

//   // Handle modal
//   const handleModal = (data) => {
//     let patient = data.patient;
//     patient.patientId = data.patientId._id;
//     patient.appointmentId = data._id;
//     setPatient(patient);
//     setShow(true);
//   };

//   // Submit Appointment
//   const submitAppointment = async (data) => {
//     try {
//       setSubmitting(true);
//       const response = await axios.put(
//         `${apiURL}/doctor/appointment/approve`,
//         data,
//         header
//       );
//       if (response.status === 201) {
//         getRequests();
//         setSubmitting(false);
//         hideModal();
//       }
//     } catch (error) {
//       if (error) {
//         console.log(error.response);
//       }
//     }
//   };

//   return (
//     <div className="index">
//       {isLoading ? (
//         <DataLoader />
//       ) : (
//         <div className="container-fluid p-0 py-2 py-lg-0">
//           <div className="col-12 pl-lg-0 mb-3">
//             <h4>Appointment Requests</h4>
//           </div>

//           <div className="col-12 pl-lg-0">
//             {/* Requests */}
//             {requests &&
//               requests.map((request, i) => (
//                 <div className="d-flex request" key={i}>
//                   <div className="pt-2">
//                     <p>{request.patient.name}</p>
//                   </div>
//                   <div className="ml-auto">
//                     <button
//                       type="button"
//                       className="btn shadow-sm"
//                       onClick={() => handleModal(request)}
//                     >
//                       Manage schedule
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* Appointment manage modal */}
//       {show ? (
//         <ManageScheduleModal
//           show={show}
//           patientinfo={patient}
//           scheduledata={submitAppointment}
//           submitted={isSubmitting}
//           hidemodal={hideModal}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default CouncilHourUpdate;
