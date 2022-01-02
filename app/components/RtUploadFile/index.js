/**
 *
 * RtUploadFile
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Label,
  Form,
  FormGroup
} from "reactstrap";

import RtInput from "../RtInput/index"
import "./rtUploadFileStyle.scss";

function RtUploadFile({
  labelText,
  name,
  onChange,
  value,
  error,
  className
}) {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    if (hiddenFileInput.current != undefined)
      hiddenFileInput.current.click();
  };

  return <>
    <Form>
      <FormGroup>
        <Label className="p-3 h4 upload-profile-photo" onClick={handleClick} >{labelText}</Label>
        <input
          ref={hiddenFileInput}
          type="file"
          name={name}
          onChange={(e) => onChange(e.target.files[0])}
          error=""
          value={value}
          className={className + " d-none"}
        />
      </FormGroup>
    </Form>
  </>;
}

RtUploadFile.propTypes = {};

export default RtUploadFile;
