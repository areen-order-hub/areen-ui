/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Switch, Route, Redirect } from "react-router-dom";
import "./appStyle.scss";
import ProtectedRoute from "../ProtectedPage";
import AdminLayout from "../../layouts/Admin";
import RTLLayout from "../../layouts/RTL.js";
import AuthLayout from "../../layouts/Auth.js";
import HomeLayout from "../../layouts/Home";
import Logout from "../Logout";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import * as operations from "./actions";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { initialState } from "../Dashboard/reducer";

export const userEmailSelector = (cookie) => get(cookie, "user.email", "");

export default function App() {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const loggedUserEmail = userEmailSelector(cookie);
  const dashboard = useSelector((state) =>
    get(state, "dashboard", { ...initialState })
  );

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if(isEmpty(dashboard.profilePicture) && !isEmpty(loggedUserEmail)){
  //     dispatch(operations.downloadProfilePicture(loggedUserEmail));
  //   }
  // },[])

  return (
    <div className="app">
      <Helmet
        titleTemplate="%s - Areen Order Hub"
        defaultTitle="Areen Order Hub"
      >
        <meta name="description" content="Areen Order Hub application" />
      </Helmet>

      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/logout" render={(props) => <Logout {...props} />} />
        <ProtectedRoute path="/" component={HomeLayout} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}
