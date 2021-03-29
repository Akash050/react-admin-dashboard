import React from "react";
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Employees = React.lazy(() =>
  import("./views/contents/employees/Employees")
);
const CreateEmployee = React.lazy(() =>
  import("./views/contents/employees/CreateEmployee")
);
const EditEmployee = React.lazy(() =>
  import("./views/contents/employees/EditEmployee")
);
const Budget = React.lazy(() => import("./views/contents/budget/Budget.js"));
const CompanyProfile = React.lazy(() => import("./views/contents/profile/Profile.js"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Contacts = React.lazy(() => import("./views/contents/contacts/Contacts"));
const Tickets = React.lazy(() =>
  import("./views/contents/supportTicket/supportTicket")
);

const CreateTicket = React.lazy(() =>
  import("./views/contents/supportTicket/CreateTicket")
);
const Company = React.lazy(() => import("./views/superAdminPanel/company/Company"));
const CreateCompany = React.lazy(() =>
  import("./views/superAdminPanel/company/CreateCompany")
);
const EditCompany = React.lazy(() =>
  import("./views/superAdminPanel/company/EditCompany")
);
const UserDashboard = React.lazy(() =>
  import("./views/userPanel/dashboard/UserPanelDashboards")
);
const UserContact = React.lazy(() =>
  import("./views/userPanel/contacts/Contacts")
);
const CreateContact = React.lazy(() =>
  import("./views/userPanel/contacts/CreateContacts")
);
const EditContact = React.lazy(() =>
  import("./views/userPanel/contacts/EditContacts")
);
const ViewContact = React.lazy(() =>
  import("./views/userPanel/contacts/viewContact")
);
const ViewProperty = React.lazy(() =>
  import("./views/userPanel/properties/ViewProperty")
);
const EditProperty = React.lazy(() =>
  import("./views/userPanel/properties/EditProperty.js")
);
const Map = React.lazy(() => import("./views/userPanel/map/Map"));
const Marketing = React.lazy(() =>
  import("./views/userPanel/marketing/Marketing")
);
const Message = React.lazy(() => import("./views/userPanel/message/Message"));
const Pipeline = React.lazy(() =>
  import("./views/userPanel/pipeline/Pipeline")
);
const Properties = React.lazy(() =>
  import("./views/userPanel/properties/Properties")
);
const PropertiesTemplate = React.lazy(() =>
  import("./views/userPanel/properties/chooseTemplate")
);
const AddCustom = React.lazy(() =>
  import("./views/userPanel/properties/AddCustom")
);
const CreateTemplate = React.lazy(() =>
  import("./views/userPanel/properties/CreateTemplate")
);
const EditTemplate = React.lazy(() =>
  import("./views/userPanel/properties/editTemplate")
);
const CreateProperty = React.lazy(() =>
  import("./views/userPanel/properties/CreateProperty")
);
const FollowUp = React.lazy(() =>
  import("./views/userPanel/FollowUp/FollowUp")
);
const Reports = React.lazy(() => import("./views/userPanel/reports/Reports"));
const Status = React.lazy(() => import("./views/userPanel/status/Status"));
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
    path: "/superadmin/companies",
    name: "Company",
    component: Company,
    role: ["admin"],
  },
  {
    path: "/superadmin/company/create",
    name: "CreateCompany",
    component: CreateCompany,
    role: ["admin"],
  },
  {
    path: "/superadmin/editcompany/:id",
    name: "EditCompany",
    component: EditCompany,
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
    path: "/user/contact/create",
    name: "CreateContact",
    component: CreateContact,
    role: ["user"]
  },

  {
    path: "/user/dashboard",
    name: "Dashboard",
    component: UserDashboard,
    role: ["user"],
  },
  {
    path: "/user/contacts",
    name: "Contact",
    component: UserContact,
    role: ["user"],
  },
  {
    path: "/user/followup",
    name: "FollowUp",
    component: FollowUp,
    role: ["user"],
  },
  {
    path: "/user/contact/edit/:id",
    name: "Edit",
    component: EditContact,
    role: ["user"],
  },
  {
    path: "/user/contact/view/:id",
    name: "View",
    component: ViewContact,
    role: ["user"],
  },
  {
    path: "/user/property/view/:id",
    name: "View",
    component: ViewProperty,
    role: ["user"],
  },
  {
    path: "/user/property/edit/:id",
    name: "Edit",
    component: EditProperty,
    role: ["user"],
  },
  {
    path: "/user/contact/create",
    name: "Contact",
    component: CreateContact,
    role: ["user"],
  },
  {
    path: "/user/map",
    name: "Map",
    component: Map,
    role: ["user"],
  },
  {
    path: "/user/marketing",
    name: "Marketing",
    component: Marketing,
    role: ["user"],
  },
  {
    path: "/user/message",
    name: "Message",
    component: Message,
    role: ["user"],
  },
  {
    path: "/user/pipeline",
    name: "Pipeline",
    component: Pipeline,
    role: ["user"],
  },
  {
    path: "/user/map",
    name: "Map",
    component: Map,
    role: ["user"],
  },
  {
    path: "/user/properties",
    name: "Properties",
    component: Properties,
    role: ["user"],
  },
  {
    path: "/user/chose/template",
    name: "Properties",
    component: PropertiesTemplate,
    role: ["user"],
  },
  {
    path: "/user/property/addcustom",
    name: "Properties",
    component: AddCustom,
    role: ["user"],
  },
  {
    path: "/user/propertytemp/create",
    name: "PropertiesTemp",
    component: CreateTemplate,
    role: ["user"],
  },
  {
    path: "/user/propertytemp/edit",
    name: "PropertiesTemp",
    component: EditTemplate,
    role: ["user"],
  },
  {
    path: "/user/property/create",
    name: "PropertiesTemp",
    component: CreateProperty,
    role: ["user"],
  },
  {
    path: "/user/report",
    name: "Reports",
    component: Reports,
    role: ["user"],
  },
  {
    path: "/user/status",
    name: "Status",
    component: Status,
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
