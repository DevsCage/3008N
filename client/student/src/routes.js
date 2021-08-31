import React from "react";
import Login from "./component/login/login";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const ViewMarks = React.lazy(() => import("./views/dashMarks/marksView"));
const ViewFees = React.lazy(() => import("./views/dashFees/viewFees"));
const PaymentHistory = React.lazy(() =>
  import("./views/dashFees/paymentHistory")
);

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/view-marks", name: "ViewMarks", component: ViewMarks },
  { path: "/view-fees", name: "ViewFees", component: ViewFees },
  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: PaymentHistory,
  },
];

export default routes;
