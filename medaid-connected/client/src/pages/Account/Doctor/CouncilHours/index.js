import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../../utils/apiURL";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const CouncilHourUpdate = () => {
  const options = [];
  obj = {};
  const splitTime = 15;

  for (var i = 0; i < 96; i++) {
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
  const [value, onChange] = useState("10:00");
  const [id] = useState(localStorage.getItem("id"));
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(id);
      console.log(data);
      setLoading(true);
      const token = `token ${localStorage.getItem("token")}`;
      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/councils/update`,
        data,
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        // responsestep(5);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  return (
    <div className="step">
      <div className="mb-4">
        <h6>Council hour</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-2">
          <div className="col-12 col-lg-4">
            {errors.day && errors.day.message ? (
              <p className="text-danger">{errors.day && errors.day.message}</p>
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
            {/* <input
              type="time"
              name="startTime"
              {...register("startTime", {
                required: "Start time is required",
              })}
              className="form-control shadow-none"
            /> */}
            <select
              name="startTime"
              {...register("startTime", {
                required: "Start time is required",
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
            <input
              type="time"
              name="endTime"
              {...register("endTime", {
                required: "End time is required",
              })}
              className="form-control shadow-none"
            />
          </div>
          {/* <DateTime timeConstraints={this.timeConstraints} /> */}

          <div className="col-12 text-right mt-3">
            <button
              type="submit"
              className="btn shadow-none"
              disabled={isLoading}
            >
              {isLoading ? <span>Please Wait...</span> : <span>Add</span>}
            </button>
          </div>
        </div>
      </form>
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
