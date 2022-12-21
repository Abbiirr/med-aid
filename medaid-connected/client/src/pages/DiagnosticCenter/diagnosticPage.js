import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";
import Select from 'react-select'

import NavbarComponent from "../../components/User/Navbar/index";
//import SearchComponent from "../../components/User/SearchForMedicine/index";
import DiagnosticCenterListComponent from "../../components/diagnosticCenterList/diagnosticComponent";
import FooterComponent from "../../components/User/Footer/index";

const Index = () => {
  //use a variable to store the search query
  const [centers, setCenters] = useState([]);
  const [allCenters, setAllCenters] = useState([]);
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
    

  const location = useLocation();
  //const value = queryString.parse(location.search);

  useEffect(() => {
    const searchCenters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/diagnosticCenter`
        );
        setCenters(response.data);
        setAllCenters(response.data);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchCenters();
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
        `http://localhost:4000/api/v1/diagnosticCenter/findCenter?centerName=${searchInput}`
      );
      console.log(response);
      setCenters(response.data);
    } catch (error) {
      if (error) console.log("error");
    }
    console.log(searchInput)
    setSearchInput("");
  }

  let centerOptions = []

  allCenters.forEach( function (item){
      centerOptions.push({
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
              {/* <input 
              className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              type = "search" 
              placeholder = "Search Medicine" 
              onChange = {handleChange}
              value={searchInput}
              /> */}
              <Select
                  onChange={(item) => setSearchInput(item.value)}
                  maxMenuHeight={175}
                  classNamePrefix="custom-select"
                  options={centerOptions}
                  //options={symptoms}
                  //isMulti
                  //isClearable={true}
                  isSearchable={true}
                  placeholder="Your medicine"
                  // have to make this field required to make the search work
              />
              <button onClick={submitSearch} type="submit">Search</button>
          </div>

      </section> 
      <div className="search-result-index">
        <div className="container">
          <div className="row">
            <div className="col-12 py-4"></div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Found {centers ? centers.length : null} medicines.
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        <DiagnosticCenterListComponent centers={centers} loading={false} />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
