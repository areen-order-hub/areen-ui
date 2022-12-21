/**
 *
 * StoreForm
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { compose } from "redux";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./storeFormStyle.scss";

export default function StoreForm() {
  useInjectReducer({ key: "storeForm", reducer });
  const dispatch = useDispatch();
  const data = useSelector((state) => get(state, "data"));

  return (
    <div className="storeForm">
      <Helmet>
        <title>StoreForm</title>
        <meta name="description" content="Description of StoreForm" />
      </Helmet>
    </div>
  );
}

StoreForm.propTypes = {};
