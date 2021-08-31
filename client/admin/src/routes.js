import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const AddStudent = React.lazy(() => import("./views/op_students/addStudent"));
const AddStaff = React.lazy(() => import("./views/op_staff/addStaff"));
const AddFee = React.lazy(() => import("./views/op_students/addFee"));
const UpdateFee = React.lazy(() => import("./views/op_students/updateFee"));
const StudentsView = React.lazy(() =>
  import("./views/op_students/viewAllStudents")
);
const StudentUpdate = React.lazy(() =>
  import("./views/op_students/updateStudent")
);
const StudentPromote = React.lazy(() =>
  import("./views/op_students/studentPromotion")
);
const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/add_student", name: "AddStudent", component: AddStudent },
  { path: "/add_staff", name: "AddStaff", component: AddStaff },
  { path: "/fee-add", name: "AddFee", component: AddFee },
  { path: "/fee-update", name: "UpdateFee", component: UpdateFee },
  { path: "/students-view", name: "StudentsView", component: StudentsView },
  { path: "/student-update", name: "StudentUpdate", component: StudentUpdate },
  {
    path: "/student-promote",
    name: "StudentPromote",
    component: StudentPromote,
  },
];

export default routes;
