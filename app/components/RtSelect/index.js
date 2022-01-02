/**
 *
 * RtSelect
 *
 */

import React from "react";
import classnames from "classnames";
import concat from "lodash/concat";
import without from "lodash/without";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Select2 from "react-select2-wrapper";

import "./rtSelectStyle.scss";

function RtSelect({
  className,
  closeMenuOnSelect,
  isMulti = false,
  data,
  placeholder,
  defaultValue,
  error = {
    path: null,
    message: null,
  },
  value,
  onChange,
}) {
  // const onValueSelect = (e) => {
  //   var values = [];
  //   if (e.params != undefined) {
  //     if (e.params.data.selected) {
  //       values = concat(value, [e.params.data.id]);
  //       onChange(values);
  //       console.log(values);
  //     }
  //   }
  // };

  // const onValueUnSelect = (e) => {
  //   var values = [];
  //   if (e.params != undefined) {
  //     values = without(value, e.params.data.id);
  //     onChange(values);
  //   }
  // };

  const hasError = !!error && error.path == name;
  return (
    <>
      <InputGroup
        className={classnames("input-group-alternative", {
          warning: hasError,
        })}
      >
        <Select2
          className="form-control"
          multiple={isMulti}
          data={data}
          options={{
            placeholder: placeholder,
            closeOnSelect: closeMenuOnSelect,
          }}
          onSelect={(e) => onChange(e.params.data.id)}
          onUnselect={(e) => onChange(e)}
          value={value}
          defaultValue={defaultValue}
        />
        {hasError ? (
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <i className="ni ni-fat-remove text-warning" />
            </InputGroupText>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
      {hasError ? (
        <div className="text-xs text-warning ml-1 pt-1">{error.message}</div>
      ) : null}
    </>
  );
}

RtSelect.propTypes = {};

export default RtSelect;
