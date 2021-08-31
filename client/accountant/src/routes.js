import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const PaymentLogNV = React.lazy(() =>
  import("./views/student-ops/paymentLogNV")
);
const PaymentLogV = React.lazy(() => import("./views/student-ops/paymentLogV"));
/*
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User')); */

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/payment-log-nv", name: "Dashboard", component: PaymentLogNV },
  { path: "/payment-log-v", name: "Dashboard", component: PaymentLogV },
];

export default routes;
