/**
 *
 * Tag
 *
 */

import React, { memo } from "react";
import classnames from "classnames";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./tagStyle.scss";

function Tag({ title, className, textClass }) {
  return (
    <span
      className={classnames(`tag bg-gradient-secondary
       px-1 mr-2 py-1 rounded border border-primary
       ${className}`)}
    >
      <span className={classnames(`text-xs text-primary ${textClass}`)}>
        {title}
      </span>
    </span>
  );
}

Tag.propTypes = {};

export default memo(Tag);
