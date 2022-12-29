import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { SidebarData } from "./SidebarData";
import "./style.scss";
import { IconContext } from "react-icons";
import { BiHide } from "react-icons/bi";

function Index() {
  const [sidebar, setSidebar] = useState(false);
  //var isLoggedin = false
  const showSidebar = () => setSidebar(!sidebar);

  const [isShow, setShow] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );
  //console.log(token);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  var role;
  const checkRole = (token) => {
    const decode = jwt_decode(token);
    role = decode.role;
    const id = decode.id;
    localStorage.setItem("id", id);

    // if (role === "super_admin" || role === "admin" || role === "manager") {
    //   return history.push("/admin");
    // }
    // if (role === "doctor") {
    //   return history.push("/doctor");
    // }

    // if (role === "patient") {
    //   return history.push("/patient");
    // }
    //console.log(role);
  };

  if (token) {
    checkRole(token);
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <IconContext.Provider value={{ color: "black", size: "25px" }}>
              <div className="LogoMenu">
                <ul>
                  <li>
                    <FaIcons.FaBars onClick={showSidebar} />
                  </li>
                  <li>
                    <NavLink activeClassName="is-Active" exact to="/">
                      <p>
                        <h2>
                          <span>
                            <b style={{ color: "red" }}>Med</b>
                          </span>
                          Aid
                        </h2>
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </Link>
          <div className="my-menu">
            <ul>
              {role === "admin" ? (
                <li>
                  <NavLink activeClassName="is-Active" exact to="/upload-data">
                    upload data
                  </NavLink>
                </li>
              ) : null}
              <li>
                <NavLink activeClassName="is-Active" exact to="/about-us">
                  about
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="is-Active" exact to="/contact-us">
                  contact
                </NavLink>
              </li>
              {token ? (
                <li>
                  <NavLink activeClassName="is-Active" exact to="/login">
                    profile
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink activeClassName="is-Active" exact to="/login">
                    login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <IconContext.Provider value={{ color: "black", size: "25px" }}>
                  <div>
                    <BiHide />
                  </div>
                </IconContext.Provider>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <IconContext.Provider
                      value={{ color: "black", size: "25px" }}
                    >
                      <div>{item.icon}</div>
                    </IconContext.Provider>

                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Index;
