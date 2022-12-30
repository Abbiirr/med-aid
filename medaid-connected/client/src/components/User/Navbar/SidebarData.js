import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
  {
    title: "Symptoms",
    path: "/symptoms",
    icon: <MdIcons.MdOutlineSick />,
    cName: "nav-text",
  },
  {
    title: "Specialist",
    path: "/doctors",
    icon: <FaIcons.FaUserMd />,
    cName: "nav-text",
  },
  {
    title: "Medicine",
    path: "/medicine",
    icon: <GiIcons.GiMedicines />,
    cName: "nav-text",
  },
  {
    title: "Diagnostics",
    path: "/diagnostic",
    icon: <GiIcons.GiTestTubes />,
    cName: "nav-text",
  },
  {
    title: "Appointment",
    path: "/appointment",
    icon: <AiIcons.AiOutlineSchedule />,
    cName: "nav-text",
  },
  {
    title: "Map",
    path: "/map",
    icon: <AiIcons.AiOutlineSchedule />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <AiIcons.AiFillSetting />,
    cName: "nav-text",
  },
];
