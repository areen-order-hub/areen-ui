/**
 *
 * RtDropDown
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import cs from 'classnames';
// import styled from 'styled-components';

import "./rtDropDownStyle.scss";

function RtDropDown({
  color,
  text,
  options,
  caret,
  dropdownClasses,
  size,
  active,
  right,
  ...rest
}) {

  return (
    <>
      <UncontrolledDropdown className={cs(dropdownClasses)}>
        <DropdownToggle caret={caret} color={color} size={size} {...rest}>
          {text}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-arrow" right={right}>
          {options.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                active={active !== null && item.value === active}
                href="#"
                onClick={e => {
                  e.preventDefault();
                  item.onClick(e);
                }}
              >
                {item.text}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

RtDropDown.propTypes = {
  color: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    })
  ).isRequired,
  caret: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  dropdownClasses: PropTypes.string,
};

RtDropDown.defaultProps = {
  caret: true,
  active: null,
  right: true,
  dropdownClasses: '',
};
export default memo(RtDropDown);
