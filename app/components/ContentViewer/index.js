/**
 *
 * ContentViewer
 *
 */

import React, { memo } from "react";
import dompurify from "dompurify";
import classname from "classnames";
import PropTypes from 'prop-types';

import "./contentViewerStyle.scss";

export const ContentPreview = ({ className, content, ...rest }) => {
  const sanitizer = dompurify.sanitize;

  return (
    <div
      className={classname(`contentPreview ${className}`)}
      dangerouslySetInnerHTML={{
        __html: sanitizer(content, {
          ALLOWED_TAGS: [
            'p',
            'b',
            'ul',
            'li',
            'br',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5'
          ],
          ALLOWED_ATTR: ['style', 'href', 'src', 'rel', 'target', 'class'],
        })
      }}
      {...rest}
    />
  );
}
function ContentViewer({ className, content, ...rest }) {
  const sanitizer = dompurify.sanitize;

  return (
    <div
      className={classname(`contentViewer ${className}`)}
      dangerouslySetInnerHTML={{
        __html: sanitizer(content, {
          ALLOWED_TAGS: [
            'b',
            'p',
            'strong',
            'em',
            'blockquote',
            'code',
            'br',
            'ul',
            'li',
            'ol',
            'i',
            'u',
            'a',
            'img',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'pre'
          ],
          ALLOWED_ATTR: ['style', 'href', 'src', 'rel', 'target', 'class'],
        })
      }}
      {...rest}
    />
  );
}

ContentViewer.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string
};

export default memo(ContentViewer);
