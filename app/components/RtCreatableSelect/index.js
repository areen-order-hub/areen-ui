/**
 *
 * RtSingleSelect
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import cs from "classnames";
// import styled from 'styled-components';
import "./rtSingleSelectStyle.scss";

function RtCreatableSelect({
  isMulti = false,
  className,
  options,
  onChange,
  value,
  name,
  error,
  title,
  ...rest
}) {
  const hasError = error && error.path == name;

  const onValueSelect = (e) => {
    if (!isMulti) {
      onChange(e.value);
    } else {
      onChange(e);
    }
  };

  return (
    <div
      className={cs("rtSingleSelect", {
        warning: hasError,
      })}
      title={title}
    >
      <CreatableSelect
        isMulti={isMulti}
        className={className}
        options={options}
        value={!isMulti ? { label: value, value } : value}
        onChange={(e) => onValueSelect(e)}
        {...rest}
      />
      {hasError ? (
        <div className="text-xs text-warning ml-1 pt-1">{error.message}</div>
      ) : null}
    </div>
  );
}

RtCreatableSelect.propTypes = {
  isMulti: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({
    path: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default memo(RtCreatableSelect);
