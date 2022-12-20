import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";

import NavbarComponent from "../../components/User/Navbar/index";
// import SearchComponent from "../../components/User/Search/index";
import MedicinesListComponent from "../../components/medicineList/medicineListComponent";
import FooterComponent from "../../components/User/Footer/index";

const Index = () => {
  //use a variable to store the search query
  const [medicines, setMedicines] = useState([]);
  const [q, setQ] = useState("");

  const location = useLocation();
  //const value = queryString.parse(location.search);

  useEffect(() => {
    const searchMedicines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/medicine`
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
      {/* -----------------Search Component----------------- */}
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={q}
            /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="sr-only">Search Medicines here</span>
        </label>
      </div>
      {/* -----------------Search Component----------------- */}
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
