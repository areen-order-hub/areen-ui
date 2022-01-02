/**
 *
 * RtReactSelect
 *
 */

import React, { memo } from "react";
import ReactSelect from "react-select";
import cs from "classnames";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./rtReactSelectStyle.scss";

function RtReactSelect({
  onChange,
  name,
  value,
  className,
  error = { path: null, message: null },
  ...rest
}) {
  const hasError = (!!error && error.path == name);
  
  return <div className={cs("rtReactSelect", {
    warning: hasError
  })}>
    <ReactSelect
      {...rest}
      className={cs(className)}
      onChange={(e) => onChange(e)}
      value={value}
    />
    {
      hasError ?
        <div className="text-xs text-warning ml-1 pt-1">{error.message}</div>
        : null
    }
  </div>;
}

RtReactSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  error: PropTypes.shape({
    path: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  value: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

export default memo(RtReactSelect);
