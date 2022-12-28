import React, { useState } from "react";
import axios from "axios";
import NavbarComponent from "../../components/User/Navbar/index";
import FooterComponent from "../../components/User/Footer/index";

import "./style.scss";

const CreatePrescription = () => {
  const [patientID, setPatientID] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [medicines, setMedicines] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setDoctorID();
    axios
      .post("http://localhost:4000/api/v1/prescription", {
        patientID,
        doctorID,
        medicines,
        instructions,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <NavbarComponent />
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="patient-name">Patient ID :</label>
        <input
          type="text"
          id="patientID"
          value={patientID}
          onChange={(event) => setPatientID(event.target.value)}
        />
        <br />
        <label htmlFor="medication">Medicines :</label>
        <input
          type="text"
          id="medicines"
          value={medicines}
          onChange={(event) => setMedicines(event.target.value)}
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
        <button type="submit">Create Prescription</button>
      </form>
      <FooterComponent />
    </div>
  );
};

export default CreatePrescription;
