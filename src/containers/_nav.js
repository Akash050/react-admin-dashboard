import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Theme"],
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Contacts",
    to: "/admin/contacts",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Support Tickets",
    to: "/admin/tickets",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Employees",
    to: "/admin/employees",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Budget",
    to: "/admin/budget",
    icon: "cil-pencil",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "GoodType",
  //   to: "/theme/goodtype",
  //   icon: "cil-pencil",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Admin",
  //   to: "/theme/typography",
  //   icon: "cil-pencil",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Drivers",
  //   to: "/theme/drivers",
  //   icon: "cil-pencil",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Settings",
  //   to: "/theme/settings",
  //   icon: "cil-pencil",
  // },

  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Components"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Users",
  //   route: "/base",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Passengers ",
  //       to: "/base/breadcrumbs",
  //     },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Cards',
  //   to: '/base/cards',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Carousel',
  //   to: '/base/carousels',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Collapse',
  //   to: '/base/collapses',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Forms',
  //   to: '/base/forms',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Jumbotron',
  //   to: '/base/jumbotrons',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'List group',
  //   to: '/base/list-groups',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Navs',
  //   to: '/base/navs',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Navbars',
  //   to: '/base/navbars',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Pagination',
  //   to: '/base/paginations',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Popovers',
  //   to: '/base/popovers',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Progress',
  //   to: '/base/progress-bar',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Switches',
  //   to: '/base/switches',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Tables',
  //   to: '/base/tables',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Tabs',
  //   to: '/base/tabs',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Tooltips',
  //   to: '/base/tooltips',
  // },
  //],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Ride Managements",
  //   route: "/buttons",
  //   icon: "cil-cursor",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "User Rides",
  //       to: "/buttons/buttons",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Driver Rides",
  //       to: "/buttons/brand-buttons",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Support",
  //       to: "/buttons/button-groups",
  //     },
  //   ],
  // },

  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Push Notifications",
  //   route: "/icons",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Send Notifications",
  //       to: "/icons/coreui-icons",

  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Flags",
  //       to: "/icons/flags",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Brands",
  //       to: "/icons/brands",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Reports",
  //   route: "/notifications",
  //   icon: "cil-bell",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Ride Reports",
  //       to: "/notifications/alerts",
  //     },

  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Widgets",
  //   to: "/widgets",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Extras"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Pages",
  //   route: "/pages",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Disabled",
  //   icon: "cil-ban",
  //   badge: {
  //     color: "secondary",
  //     text: "NEW",
  //   },
  //   addLinkClass: "c-disabled",
  //   disabled: true,
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  //   className: "m-2",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Labels"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label danger",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-danger",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label info",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-info",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label warning",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-warning",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  //   className: "m-2",
  // },
];

export default _nav;
