import React from "react";
import classnames from "classnames";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import ReactDatetime from "react-datetime";
import toNumber from "lodash/toNumber";
import isArray from "lodash/isArray";
import isNil from "lodash/isNil";
import find from "lodash/find";
import get from "lodash/get";
function RtInput({
  onChange,
  onFocus,
  icon,
  type,
  placeholder,
  name,
  value,
  error,
  className,
  disable,
  ref,
  inputType = "text",
}) {
  const isErrorAvailable = !isNil(error);
  const isErrorArray = isErrorAvailable && isArray(error);
  const correctError = isErrorArray ? find(error, ["path", name]) : error;
  const isValidError =
    isErrorAvailable && !!correctError && get(correctError, "path") === name;
  const getPrepend = () => {
    if (icon)
      return (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={`ni ${icon}`} />
          </InputGroupText>
        </InputGroupAddon>
      );
    return null;
  };

  return (
    <>
      {inputType == "text" ? (
        <InputGroup
          className={classnames(
            "rt-input input-group-merge input-group-alternative",
            {
              warning: isValidError,
            }
          )}
        >
          {getPrepend()}
          <Input
            placeholder={placeholder}
            type={type}
            onChange={(e) => {
              if (type == "number") {
                return onChange(toNumber(e.target.value));
              }
              onChange(e.target.value);
            }}
            autoComplete="true"
            className={className}
            value={value}
            onFocus={onFocus}
            ref={ref}
            disabled={disable}
          />
        </InputGroup>
      ) : (
        <ReactDatetime
          inputProps={{
            placeholder,
            required: true,
          }}
          dateFormat="DD MMM YYYY"
          timeFormat={false}
          className="text-sm"
          onChange={(e) => {
            try {
              onChange(e);
            } catch (err) {
              onChange(null);
            }
          }}
          value={value}
          initialValue={value}
        />
      )}
      {isValidError ? (
        <div className="text-xs text-warning ml-1 pt-1">
          {correctError.message}
        </div>
      ) : null}
    </>
  );
}

export default RtInput;
