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
  const [tests, setTests] = useState([]);
  const [allCenters, setAllCenters] = useState([]);
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
    

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
        //--------------getting the tests----------------
        // let tempTests = new Set();
        // allCenters.forEach((center) => {
        //   center.tests.forEach((test) => {
        //     tempTests.add(test.test_name);
        //   });
        // });
        // setTests(tempTests);
        // console.log("tests : ", tests);
        //-----------------end of getting the tests----------------
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
        `http://localhost:4000/api/v1/diagnosticCenter/findCenter?testName=${searchInput}`
      );
      console.log("Test based center : ", response.data);
      setCenters(response.data);
      setMessage("Search results for " + searchInput);
    } catch (error) {
      if (error) console.log("error");
    }
    console.log(searchInput)
    setSearchInput("");
  }

  //let centerOptions = []
  let centerOptions2 = []

  // allCenters.forEach( function (item){
  //     centerOptions.push({
  //         label: item.name,
  //         value: item.name
  //     })
  // })

  allCenters.forEach( function (item){
    item.tests.forEach( function (test){
      centerOptions2.push({
        label: test.test_name,
        value: test.test_name,
      });
    })
  })
  //create a set to remove duplicate values from array of 2 properties
  const centerOptionsSet = new Set(centerOptions2.map(JSON.stringify));
  const centerOptions3 = Array.from(centerOptionsSet).map(JSON.parse);


  console.log("options : ",centerOptions2)



  return (
    <div>
      <NavbarComponent />
      <section className="garamond">
          <div className="navy georgia ma0 grow">
              <h2 className="f2">Search your tests</h2>
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
                  options={centerOptions3}
                  //options={symptoms}
                  //isMulti
                  //isClearable={true}
                  isSearchable={true}
                  placeholder="Your tests??"
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
                Found {centers ? centers.length : null} centers.
              </h3>
              <h5>
                {message ? message : null}
              </h5>
            </div>
          </div>
        </div>

        {/* Results */}
        <DiagnosticCenterListComponent centers={centers} loading={false} message={message}/>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
