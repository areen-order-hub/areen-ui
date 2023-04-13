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
import StoreForm from "containers/StoreForm";
import StoreDetails from "containers/StoreDetails";

import Orders from "containers/Orders";
import OrderDetails from "containers/OrderDetails";

import Users from "containers/Users";
import UserForm from "containers/UserForm";

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
    {
      redirect: true,
      path: "/store-form",
      name: "StoreForm",
      component: StoreForm,
      layout: "",
    },
    {
      redirect: true,
      path: "/store/:id",
      name: "Store",
      component: StoreDetails,
      layout: "",
    },
    {
      redirect: true,
      path: "/order/:id",
      name: "Order",
      component: OrderDetails,
      layout: "",
    },
    // {
    //   redirect: true,
    //   path: "/client/:id",
    //   name: "Client",
    //   component: Client,
    //   layout: "",
    // },
    {
      path: "/orders",
      name: "Orders",
      icon: "fas fa-file-signature text-secondary",
      component: Orders,
      layout: "",
    },
    {
      path: "/users",
      name: "Users",
      icon: "fas fa-users text-secondary",
      component: Users,
      layout: "",
    },
    {
      redirect: true,
      path: "/user-form",
      name: "UserForm",
      component: UserForm,
      layout: "",
    },
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
    // }
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
