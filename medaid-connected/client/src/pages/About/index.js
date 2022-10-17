import React from "react";
import "./style.scss";
import { Images } from "../../utils/Images";

import NavbarCompoent from "../../components/User/Navbar/index";
import FooterCompoent from "../../components/User/Footer/index";

const Index = () => {
  return (
    <div className="about">
      <NavbarCompoent />
      {/* Header Banner */}
      <div className="header py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 content d-none d-lg-block">
              <h1>
                About<span> MedAid</span>
              </h1>
            </div>
            <div className="col-12 col-lg-6 image-column text-center d-none d-lg-block">
              <img src={Images.About} alt="..." />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>MedAid</h3>
              <p>this is a doctor app</p>
              <p>this is for dp1</p>
              <p>Work in progress</p>
              <p><a href="https://www.canva.com/design/DAFKIbUdQd0/o3qGIgirlud8VV-xSlQUsw/view?utm_content=DAFKIbUdQd0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">More Info..</a></p>
            </div>
          </div>
        </div>
      </div>
      <FooterCompoent />
    </div>
  );
};

export default Index;