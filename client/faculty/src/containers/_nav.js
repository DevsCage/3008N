import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/a",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Students"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Marks",
    to: "/add-marks",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavItem",
    name: "View Marks",
    to: "//",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Update Marks Cards",
    to: "/update-markscard",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Generate Marks Sheet",
    to: "/sample",
    icon: "cil-pencil",
  },
];

export default _nav;
