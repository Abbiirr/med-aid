import React from "react";
import "./style.scss";
import { Icon } from "react-icons-kit";
import { ic_close } from "react-icons-kit/md";
import { Images } from "../../../../../utils/Images";
import { NavLink, useHistory } from "react-router-dom";
import {
  ic_apps,
  ic_people,
  ic_info_outline,
  ic_lock,
} from "react-icons-kit/md";

const Index = ({ message, hide }) => {
  return (
    <div className="alert-modal-backdrop">
      <div className="flex-center flex-column">
        <div className="card border-0 shadow">
          <div className="card-header border-0 text-right bg-white p-4">
            <button
              type="button"
              className="btn rounded-circle shadow-none"
              onClick={hide}
            >
              <Icon icon={ic_close} size={22} />
            </button>
          </div>
          <div className="card-body text-center px-4 pt-0 pb-5">
            <img src={Images.Unlock} className="img-fluid" alt="..." />
            <h6 className="mb-0">{message}</h6>
            <NavLink
              exact
              activeClassName="is-Active"
              className="btn btn-block shadow-none"
              to="/login"
            >
              <Icon icon={ic_apps} size={20} />
              <span>Login</span>
            </NavLink>
            <NavLink
              exact
              activeClassName="is-Active"
              className="btn btn-block shadow-none"
              to="/register"
            >
              <Icon icon={ic_apps} size={20} />
              <span>Register</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
