import React from "react";
import CIcon from "@coreui/icons-react";
import { MdPayment } from "react-icons/md";
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Student Fee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Payment Logs (NV)",
    to: "/payment-log-nv",
    icon: <MdPayment size="38" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Payment Logs (V)",
    to: "/payment-log-v",
    icon: <MdPayment size="38" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Payment Log Manually",
    to: "/add-payment-log",
    icon: <MdPayment size="38" />,
  },
];

export default _nav;
