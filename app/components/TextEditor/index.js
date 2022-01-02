/**
 *
 * TextEditor
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import classnames from "classnames";
import "./textEditorStyle.scss";

function TextEditor({
  error = {
    path: null,
    message: null,
  },
  value,
  onChange,
  className = "",
  name,
  ...rest
}) {
  const hasError = error && error.path == name;

  return (
    <div className="textEditor">
      <ReactQuill
        theme="snow"
        value={value}
        className={classnames(`${className}`, {
          warning: hasError,
        })}
        onChange={onChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "blockquote", "code", "image"],
            [{ size: ["small", false, "large", "huge"] }],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
            [{ color: [] }, { background: [] }],
          ],
        }}
        {...rest}
      />
      {hasError ? (
        <div className="text-xs text-warning ml-1 pt-1">{error.message}</div>
      ) : null}
    </div>
  );
}

TextEditor.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default memo(TextEditor);
