import React from "react";
const Employees = React.lazy(() =>
  import("./views/adminPanel/employees/Employees")
);
const CreateEmployee = React.lazy(() =>
  import("./views/adminPanel/employees/CreateEmployee")
);
const EditEmployee = React.lazy(() =>
  import("./views/adminPanel/employees/EditEmployee")
);
const Budget = React.lazy(() => import("./views/adminPanel/budget/Budget.js"));
const CompanyProfile = React.lazy(() => import("./views/adminPanel/profile/Profile.js"));
const Dashboard = React.lazy(() => import("./views/adminPanel/dashboard/DashBoard.js"));
const Contacts = React.lazy(() => import("./views/adminPanel/contacts/Contacts"));
const Tickets = React.lazy(() =>
  import("./views/adminPanel/supportTicket/supportTicket")
);

const CreateTicket = React.lazy(() =>
  import("./views/adminPanel/supportTicket/CreateTicket")
);

const UserDashboard = React.lazy(() =>
  import("./views/userPanel/dashboard/UserPanelDashboards")
);

const Message = React.lazy(() => import("./views/userPanel/message/Message"));

const Reports = React.lazy(() => import("./views/userPanel/reports/Reports"));
const Task = React.lazy(() => import("./views/userPanel/task/Task"));

const routes = [
  { path: "/", exact: true, name: "Home", role: "admin" }, ,
  {
    path: "/admin/tickets",
    name: "Tickets",
    component: Tickets,
    role: ["admin"],
  },
  {
    path: "/admin/ticket/create",
    name: "CreateTicket",
    component: CreateTicket,
    role: ["admin"],
  },

  {
    path: "/admin/employees",
    name: "Employees",
    component: Employees,
    role: ["admin"],
  },
  {
    path: "/admin/employee/create",
    name: "CreateEmployee",
    component: CreateEmployee,
    role: ["admin"],
  },
  {
    path: "/admin/employee/edit/:id",
    name: "EditEmployee",
    component: EditEmployee,
    role: ["admin"],
  },
  {
    path: "/admin/budget",
    name: "budget",
    component: Budget,
    role: ["admin", ],
  },
  {
    path: "/admin/profile",
    name: "profile",
    component: CompanyProfile,
    role: ["admin"],
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    role: [ "admin"],
  },
  {
    path: "/admin/contacts",
    name: "Contacts",
    component: Contacts,
    role: ["admin"],
  },

  {
    path: "/user/dashboard",
    name: "Dashboard",
    component: UserDashboard,
    role: ["user"],
  },


  {
    path: "/user/message",
    name: "Message",
    component: Message,
    role: ["user"],
  },

  {
    path: "/user/report",
    name: "Reports",
    component: Reports,
    role: ["user"],
  },

  {
    path: "/user/task",
    name: "Task",
    component: Task,
    role: ["user"],
  },
];

export default routes;
