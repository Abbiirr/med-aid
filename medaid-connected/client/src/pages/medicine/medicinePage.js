import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";

import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import MedicinesListComponent from "../../components/medicineList/medicineListComponent";
import FooterComponent from "../../components/User/Footer/index";

//http://localhost:4000/api/v1/patient/findMedicines?symptoms=sneezing

const Index = () => {
  //use a variable to store the search query
  const [medicines, setMedicines] = useState([]);

  const location = useLocation();
  const value = queryString.parse(location.search);
  const symptoms = value.symptoms;
  //console.log(symptoms)

  useEffect(() => {
    const searchMedicines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/medicine/"
        );
        setMedicines(response.data);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchMedicines();
  }, []);

  return (
    <div>
      <NavbarComponent />

      <div className="search-result-index">
        <div className="container">
          <div className="row">
            <div className="col-12 py-4"></div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Found {medicines ? medicines.length : null} medicines.
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        <MedicinesListComponent medicines={medicines} loading={false} />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
