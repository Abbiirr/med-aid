import React from "react";
import "./style.scss";
import { Images } from "../../utils/Images";

import NavbarComponent from "../../components/User/Navbar/index";
import FooterComponent from "../../components/User/Footer/index";



const Index = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="four-o-four">
        <div className="flex-center flex-column text-center">
          <img src={Images.FourOFour} className="img-fluid" alt="..." />
          <h5>You are following wrong way !!</h5>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Index;
