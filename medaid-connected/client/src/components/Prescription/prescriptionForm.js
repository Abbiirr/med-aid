import React, { useState, useEffect } from "react";
import axios from "axios";


import Select from "react-select";

import "./style.scss";
import { list } from "react-icons-kit/icomoon";
// import { NULL } from "node-sass";

const CreatePrescription = (props) => {

  const [patientID, setPatientID] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [instructions, setInstructions] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  var doctorName = props.props.name;
  var listOfAppointments = props.props.appointments

  useEffect(() => {
    const searchMedicines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/medicine`
        );
        setMedicines(response.data);
        //console.log(medicines)
      } catch (error) {
        if (error) console.log("error");
      }
    };

    const searchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/patient/profile`
        );
        setPatients(response.data);
        //console.log("patients : ", patients);
      } catch (error) {
        if (error) console.log("error");
      }
    };

    searchPatients();
    searchMedicines();
  }, []);

const patientOptions = [];

patients.forEach(function (item) {
  if(item.name !== null){
    patientOptions.push({
      label: item.name,
      value: item.name,
    });
  }
});

//console.log("patient options : ", patientOptions);



  //setDoctorID(props.props.name.toString());
  //console.log("doctor : ", props.props);

  const medArray = medicines.map((item) => item.name);
  const uniqueMedArray = [...new Set(medArray)];
  //console.log(uniqueMedArray);

  const options = [];

  uniqueMedArray.forEach(function (item) {
    options.push({
      label: item,
      value: item,
    }); 
  });


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

    console.log("all info", selectedPatient, arrOfoptions, instructions);
    
    const response = axios
      .post("http://localhost:4000/api/v1/prescription", {
        selectedPatient,
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
          value={selectedPatient}
          onChange={(event) => setSelectedPatient(event.target.value)}
        />
        {/* <Select
          // onChange={(item) => setSelectedOptions(item.value)}
          onChange={(item) => setSelectedPatient(item.value)}
          maxMenuHeight={175}
          classNamePrefix="custom-select"
          options={patientOptions}
          //options={symptoms}
          // isMulti
          isClearable={true}
          isSearchable={true}
          placeholder="Select Patient"
        /> */}
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
