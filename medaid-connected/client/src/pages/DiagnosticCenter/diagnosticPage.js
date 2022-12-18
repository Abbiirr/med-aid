import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import queryString from "query-string";
import { useLocation } from "react-router";

import NavbarComponent from "../../components/User/Navbar/index";
// import SearchComponent from "../../components/User/Search/index";
import DiagnosticComponent from "../../components/diagnosticCenterList/diagnosticComponent";
import FooterComponent from "../../components/User/Footer/index";

const Index = () => {
  //use a variable to store the search query
  const [centers, setCenters] = useState([]);

  const location = useLocation();
  const value = queryString.parse(location.search);

  useEffect(() => {
    const searchCenters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/diagnosticCenter`
        );
        setCenters(response.data);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchCenters();
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
                Found {centers ? centers.length : null} Centers.
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        <DiagnosticComponent centers={centers} loading={false} />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
