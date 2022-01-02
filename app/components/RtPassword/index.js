import React from "react";
import classnames from "classnames";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
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
}) {
  const isErrorAvailable = !isNil(error);
  const isErrorArray = isErrorAvailable && isArray(error);
  const correctError = isErrorArray ? find(error, ["path", name]) : error;
  const isValidError =
    isErrorAvailable && !!correctError && get(correctError, "path") === name;
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <InputGroup
        className={classnames(
          "rt-password input-group-merge input-group-alternative",
          {
            warning: isValidError,
          }
        )}
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={`ni ${icon}`} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type={passwordShown ? "text" : "password"}
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
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <i
              onClick={togglePasswordVisiblity}
              className={` hover-pointer ${
                passwordShown ? "far fa-eye-slash" : "far fa-eye"
              }`}
            />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isValidError ? (
        <div className="text-xs text-warning ml-1 pt-1">
          {correctError.message}
        </div>
      ) : null}
    </>
  );
}

export default RtInput;
