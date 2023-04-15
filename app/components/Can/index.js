/**
 *
 * Can
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { useAccess } from "utils/permissions";
// import styled from 'styled-components';

import "./canStyle.scss";

function Can({ children, moduleName, action }) {
  const hasPermission = useAccess(moduleName, action);
  if (hasPermission) return children;
  return null;
}

Can.propTypes = {
  children: PropTypes.node,
  moduleName: PropTypes.string,
  action: PropTypes.string,
};

Can.defaultProps = {
  children: null,
  moduleName: "",
  action: "read",
};

export default memo(Can);
