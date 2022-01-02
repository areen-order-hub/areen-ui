import React from 'react';
import ReactBSAlert from 'react-bootstrap-sweetalert';

class AlertPopup extends React.Component {
  state = {
    show: false,
    options: null,
    data: null,
    ChildTag: null,
    ChildProps: {}
  };

  isShowing = () => {
    return this.state.show;
  };

  // using data here so that when calling delete api we can pass it from here as argument
  // To open regular confirm modal which we have on delete
  show = ({ data, ...restOptions }) => {
    this.setState({ show: true, options: restOptions, data });
  };

  // using data here so that when calling delete api we can pass it from here as argument
  // to open custom modal when we want to customize modal
  showCustom = ({ data, ChildTag = 'p', ChildProps = {}, ...restOptions }) => {
    this.setState({
      showCustom: true,
      options: restOptions,
      data,
      ChildTag,
      ChildProps
    });
  };

  handleConfirmClick = () => {
    this.state.options.onConfirm(this.state.data);
    this.resetState();
  };

  handelCancelClick = () => {
    this.state.options.onCancel && this.state.options.onCancel(this.state.data);
    this.resetState();
  };

  resetState = () => {
    this.setState({
      show: false,
      showCustom: false,
      options: null,
      data: null,
    });
  };

  render() {
    if (!this.state.show && !this.state.showCustom) {
      return null;
    }
    const { ChildTag = 'p', ChildProps = {} } = this.state;
    const { warning, onCancel, onConfirm, text, ...rest } = this.state.options;
    if (this.state.show) {
      return (
        <ReactBSAlert
          warning
          showCancel
          show={this.state.show}
          onCancel={this.handelCancelClick}
          onConfirm={this.handleConfirmClick}
          title="Are you sure?"
          confirmBtnBsStyle="warning"
          cancelBtnBsStyle="outline-warning"
          btnSize=""
          {...rest}
        >
          {text}
        </ReactBSAlert>
      );
    } else if (this.state.showCustom) {
      return (
        <ReactBSAlert
          custom
          showCancel
          show={this.state.showCustom}
          onCancel={this.handelCancelClick}
          onConfirm={this.handleConfirmClick}
          confirmBtnBsStyle="info"
          btnSize=""
          {...rest}
        >
          <ChildTag
            onConfirm={this.resetState}
            onCancel={this.resetState}
            {...ChildProps}
          >
            {text}
          </ChildTag>
        </ReactBSAlert>
      );
    }
  }
}

export default AlertPopup;
