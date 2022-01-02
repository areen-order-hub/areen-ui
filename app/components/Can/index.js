/**
 *
 * Can
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import { useAccess } from "utils/permissions";
// import styled from 'styled-components';

import "./canStyle.scss";

function Can({
  children,
  permissions
}) {

  const hasPermission = useAccess(permissions);
  if(hasPermission)
    return children;
  return null;
}

Can.propTypes = {
  children: PropTypes.node,
  permissions: PropTypes.array.isRequired,
};

Can.defaultProps = {
}

export default memo(Can);
