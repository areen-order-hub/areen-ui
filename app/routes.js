/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "containers/Login";
import Register from "containers/Register";
import ResetPassword from "containers/ResetPassword";
import ChangePassword from "containers/ChangePassword";
import Terms from "views/pages/Terms";
import Privacy from "views/pages/Privacy";
import Dashboard from "containers/Dashboard";

import Stores from "containers/Stores";
import Clients from "containers/Clients";
import Client from "containers/Client";
import AddClient from "containers/AddClient";

import Candidates from "containers/Candidates";
import Candidate from "containers/Candidate";

import Positions from "containers/Positions";
import Position from "containers/Position";
import AddPosition from "containers/AddPosition";
import PositionTracker from "containers/PositionTracker";

import Interviews from "containers/Interviews";

import Recruiters from "containers/Recruiters";
import AddRecruiter from "containers/AddRecruiter";

import Profile from "containers/Profile";

import WhatsNew from "containers/WhatsNew";

import { permissions } from "utils/permissions";

const routes = {
  home: [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "ni ni-shop text-secondary",
      component: Dashboard,
      layout: "",
    },
    {
      path: "/stores",
      name: "Stores",
      icon: "far fa-building text-secondary",
      component: Stores,
      layout: "",
    },
    // {
    //   permission: permissions.ADD_A_CLIENT,
    //   redirect: true,
    //   path: "/add-client",
    //   name: "AddClient",
    //   component: AddClient,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/client/:id",
    //   name: "Client",
    //   component: Client,
    //   layout: "",
    // },
    // {
    //   path: "/positions",
    //   name: "Positions",
    //   icon: "fas fa-file-signature text-secondary",
    //   component: Positions,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/add-position",
    //   name: "AddPosition",
    //   component: AddPosition,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/position/:id",
    //   name: "Position",
    //   component: Position,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/position-tracker",
    //   name: "PositionTracker",
    //   component: PositionTracker,
    //   layout: "",
    // },
    // {
    //   path: "/candidates",
    //   name: "Candidates",
    //   icon: "fas fa-users text-secondary",
    //   component: Candidates,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/candidate/:id",
    //   name: "Candidate",
    //   component: Candidate,
    //   layout: "",
    // },
    // {
    //   path: "/interviews",
    //   name: "Interviews",
    //   icon: "far fa-calendar-alt text-secondary",
    //   component: Interviews,
    //   layout: "",
    // },
    // {
    //   permission: permissions.VIEW_RECRUITERS,
    //   path: "/recruiters",
    //   name: "Recruiters",
    //   icon: "fas fa-users text-secondary",
    //   component: Recruiters,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/add-recruiter",
    //   name: "AddRecruiter",
    //   component: AddRecruiter,
    //   layout: "",
    // },
    // {
    //   redirect: true,
    //   path: "/profile/:id",
    //   name: "Profile",
    //   component: Profile,
    //   layout: "",
    // },
    {
      path: "/updates",
      name: "What's New",
      icon: "fas fa-question text-secondary",
      component: WhatsNew,
      layout: "",
    },
    {
      path: "/logout",
      name: "Logout",
      icon: "ni ni-button-power text-secondary",
      layout: "",
    },
  ],
  auth: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      layout: "/auth",
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      layout: "/auth",
    },
    {
      path: "/resetpassword",
      name: "Reset",
      component: ResetPassword,
      layout: "/auth",
    },
    {
      path: "/changepassword",
      name: "ChangePassword",
      component: ChangePassword,
      layout: "/auth",
    },
    {
      path: "/terms",
      name: "Terms & Conditions",
      component: Terms,
      layout: "/auth",
    },
    {
      path: "/privacy",
      name: "Privacy policy",
      component: Privacy,
      layout: "/auth",
    },
  ],
};

export default routes;
