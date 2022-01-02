import React from 'react';

const defaultProps = {
  place: 'tr',
  type: 'default',
  autoDismiss: 5,
};

class NotificationHandler extends React.Component {
  ref = null;

  open = options => {
    this.ref.show({ ...this.props, ...options });
  };

  close() {
    this.ref.close();
  }

  setRef = ref => {
    this.ref = ref;
  };
}

export default new NotificationHandler(defaultProps);
