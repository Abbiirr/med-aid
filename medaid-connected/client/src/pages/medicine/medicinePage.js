import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";
import Select from "react-select";
import "./style.scss";

import NavbarComponent from "../../components/User/Navbar/index";
//import SearchComponent from "../../components/User/SearchForMedicine/index";
import MedicinesListComponent from "../../components/medicineList/medicineListComponent";
import FooterComponent from "../../components/User/Footer/index";

const Index = () => {
  //use a variable to store the search query
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllmedicines] = useState([]);
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  //const value = queryString.parse(location.search);

  useEffect(() => {
    const searchMedicines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/medicine`
        );
        setMedicines(response.data);
        setAllmedicines(response.data);
        setMessage("");
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchMedicines();
  }, []);

  //console.log(q);

  const handleChange = e => {
    setSearchInput(e.target.value)
 };

 const submitSearch = async (e) =>{
    e.preventDefault();
    //dispatch(fetchSearch(searchInput));
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/medicine/findMedicine?medicineName=${searchInput}`
      );
      console.log(response);
      let temp = response.data;
      temp = [...temp].sort((a, b) => a.price - b.price);
      //setMedicines(response.data);
      setMedicines(temp)
      setMessage("Sorted By Price")
    } catch (error) {
      if (error) console.log("error");
    }
    console.log(searchInput)
    setSearchInput("");
  }

  let medicineOptions = []

  allMedicines.forEach( function (item){
      medicineOptions.push({
          label: item.name,
          value: item.name
      })
  })


  return (
    <div>
      <NavbarComponent />
      <section className="garamond">
        <div className="navy georgia ma0 grow">
          <h2 className="f2">Search your medicine</h2>
        </div>
        <div className="pa2">
          <Select
            onChange={(item) => setSearchInput(item.value)}
            maxMenuHeight={175}
            classNamePrefix="custom-select"
            options={medicineOptions}
            //options={symptoms}
            //isMulti
            //isClearable={true}
            isSearchable={true}
            placeholder="Your medicine"
            // have to make this field required to make the search work
          />
          <button onClick={submitSearch} type="submit" className="btn">
            Search
          </button>
        </div>
      </section>
      <div className="search-result-index">
        <div className="container">
          <div className="row">
            <div className="col-12 py-4"></div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Found {medicines ? medicines.length : null} medicines.
              </h3>
              <h6 className="font-weight-bold mb-0">
                {message ? message : null}
              </h6>
            </div>
          </div>
        </div>

        {/* Results */}
        <MedicinesListComponent
          medicines={medicines}
          loading={false}
          message={message}
        />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
