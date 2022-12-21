import React, { useState, createRef } from "react";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import DoctorShowComponent from "../../doctorSearchPage/DoctorShow/doctorShowSide";
import { Images } from "../../../utils/Images";
import axios from "axios";

const Index = ({ doctors, loading }) => {
  const [show, setShow] = useState(false);
  const [doctor, setDoctor] = useState();
  const [staticArr] = useState([...Array(16).keys()]);
  const cardBody = createRef();

  //console.log(doctors[0].image.toString())

  const closeShow = () => setShow(false);

  

  // Show Doctor Info
  const showDoctorInfo = (data) => {
    setShow(true);
    setDoctor(data);
    console.log(data.image)
  };

  // Check Loading
  if (loading) {
    return (
      <div>
        <div className="container py-3">
          <div className="row px-2 px-sm-0">
            {staticArr.map((i) => {
              return (
                <div className="col-6 col-md-4 col-lg-3 p-2" key={i}>
                  <div className="card rounded-0 border-0">
                    <Skeleton
                      animation={true}
                      count={1}
                      width={cardBody.width}
                      height={200}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctors-list-component">
      <div className="container">
        <div className="row px-2 px-sm-0">
          {doctors &&
            doctors.map((doctor, i) => (
              <div className="col-6 col-md-4 col-lg-3 p-2" key={i}>
                <div className="card doctor-card">
                  <div
                    className="card-body"
                    onClick={() => showDoctorInfo(doctor)}
                  >
                    <div className="img-box rounded-circle">
                      {
                      doctor.image ? (
                        <img
                          // src={doctor.image}
                          src={Images.Doctor}
                          //src=""
                          className="img-fluid"
                          alt="doctor"
                        />
                      ) : (
                        <img
                          src={Images.Doctor}
                          className="img-fluid"
                          alt="not found"
                        />
                      )}
                    </div>
                    <div className="content">
                      <h6>{doctor.name}</h6>
                      <p className="text-capitalize">
                        {doctor.specialist} Specialist
                      </p>
                      <p className="text-capitalize">
                        {doctor.currentHospital}
                      </p>
                      {/* <p className="text-capitalize">{doctor._id}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Show Doctor */}
      {show ? <DoctorShowComponent show={closeShow} doctor={doctor} /> : null}
    </div>
  );
};

export default Index;
