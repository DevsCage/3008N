import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const AddMarks = React.lazy(() => import("./views/student-ops/addMarks"));
const ViewStuds = React.lazy(() => import("./views/student-ops/viewStudents"));
const UpdateMarksCard = React.lazy(() =>
  import("./views/student-ops/updateMarksCard")
);
const routes = [
  //   { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/add-marks", name: "AddMarks", component: AddMarks },
  {
    path: "/update-markscard",
    name: "UpdateMarksCard",
    component: UpdateMarksCard,
  },
  { path: "/view-studs", name: "ViewStuds", component: ViewStuds },
];

export default routes;
