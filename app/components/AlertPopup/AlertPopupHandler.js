import React from 'react';

class AlertPopupHandler extends React.Component {
  ref = null;

  isOpen = () => {
    return this.ref.isShowing();
  };

  open = options => {
    this.ref.show({ ...options });
  };

  openCustom = options => {
    this.ref.showCustom({ ...options });
  };

  close() {
    this.ref.resetState();
  }

  setRef = ref => {
    this.ref = ref;
  };
}

export default new AlertPopupHandler();
