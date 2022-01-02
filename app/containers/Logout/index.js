/**
 *
 * Logout
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loaders/BrandPage";
import * as operations from "./actions";
import "./logoutStyle.scss";

export default function Logout() {
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(operations.onLogout());
  }, []);

  return <Loader />;
}

Logout.propTypes = {};
