import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Students"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add New Student",
    to: "/add_student",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavItem",
    name: "View Students",
    to: "/students-view",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Update Student",
    to: "/student-update",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Student Promotion",
    to: "/student-promote",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Student Fees",
    to: "//",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Student Marks",
    to: "//",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Fees"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add New Fee",
    to: "/fee-add",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Update Fee Details",
    to: "/fee-update",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Fee Payment Logs",
    to: "/fee_pay_logs",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Staff"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add New Staff",
    to: "/add_staff",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View All Staff ",
    to: "//",
    icon: "cil-pencil",
  },
];

export default _nav;
