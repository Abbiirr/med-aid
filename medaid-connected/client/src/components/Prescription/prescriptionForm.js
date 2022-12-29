import React, { useState } from "react";
import axios from "axios";


import Select from "react-select";

import "./style.scss";

const CreatePrescription = (props) => {

  const [patientID, setPatientID] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [instructions, setInstructions] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([]);

  var doctorName = props.props.name;

  //setDoctorID(props.props.name.toString());
  //console.log("doctor : ", typeof props.props.name);

  const options = [
    { value: "napa", label: "napa" },
    { value: 'ace', label: 'ace' },
    { value: 'montair', label: 'montair' },
    { value: 'finix', label: 'finix' }
  ];

  let i = 0;
  let arrOfoptions = [];

  const handleSubmit = (event) => {

    event.preventDefault();
    
    selectedOptions.forEach((item) => {
      arrOfoptions[i] = item.value;
      i++;
    });

    setDoctorID(props.props.name.toString());
    console.log("doctor : ", doctorName);

    console.log("all info", patientID, arrOfoptions, instructions);
    
    const response = axios
      .post("http://localhost:4000/api/v1/prescription", {
        patientID,
        doctorName,
        arrOfoptions,
        instructions,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(response);
  };

  return (
    <div className="container">
      <form className="form-container">
        <label htmlFor="patient-name">Patient ID :</label>
        <input
          type="text"
          id="patientID"
          value={patientID}
          onChange={(event) => setPatientID(event.target.value)}
        />
        <br />
        <label htmlFor="medication">Medicines :</label>
        <Select
          // onChange={(item) => setSelectedOptions(item.value)}
          onChange={(item) => setSelectedOptions(item)}
          maxMenuHeight={175}
          classNamePrefix="custom-select"
          options={options}
          //options={symptoms}
          isMulti
          isClearable={true}
          isSearchable={true}
          placeholder="Select Medicines"
        />
        <br />
        <label htmlFor="dosage">Instruction :</label>
        <input
          type="text"
          id="instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Create Prescription
        </button>
      </form>
    </div>
  );

};

export default CreatePrescription;
