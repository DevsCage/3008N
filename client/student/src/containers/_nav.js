import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Theme"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Marks",
    to: "/view-marks",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Pending Fees",
    to: "/view-fees",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Payment History",
    to: "/payment-history",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Document Submission",
    to: "/doc-submit",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "College Fee Payment",
    to: "/doc-submit",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Exam Fee Payment",
    to: "/doc-submit",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "University Fee Payment",
    to: "/doc-submit",
    icon: "cil-pencil",
  },
];

export default _nav;
