import React from 'react';
import NotificationAlert from 'react-notification-alert';
import classes from './Notifications.module.scss';
import cs from 'classnames';

class Notifications extends React.Component {
  getOptions = (type, title, message, icon) => {
    switch (type) {
      case 'create':
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon ? icon : 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title ? title : "Hooray! You're a creator!"}
              </span>
              <span data-notify="message">{message ? message : ''}</span>
            </div>
          ),
        };
      case 'update':
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon ? icon : 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title ? title : 'Success!'}
              </span>
              <span data-notify="message">{message ? message : ''}</span>
            </div>
          ),
        };
      case 'warning':
        return {
          type: 'warning',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon ? icon : 'fas fa-frown-open'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title ? title : 'Uh oh! Something went wrong'}
              </span>
            </div>
          ),
        };
      case 'failure':
        return {
          type: 'danger',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon ? icon : 'fas fa-frown'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title ? title : 'Uh oh! Something went wrong'}
              </span>
              <span data-notify="message">
                {message ? message : 'Please try again later'}
              </span>
            </div>
          ),
        };
      default:
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon ? icon : 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title ? title : "Hooray! You're a creator!"}
              </span>
              <span data-notify="message">{message ? message : ''}</span>
            </div>
          ),
        };
    }
  };

  show = options => {
    let notifyOptions = this.getOptions(
      options.operation,
      options.title,
      options.message,
      options.icon
    );
    this.refs.notificationAlert.notificationAlert({
      ...options,
      ...notifyOptions,
    });
  };

  render() {
    return (
      <>
        <div className={cs('rna-wrapper', classes.root)}>
          <NotificationAlert ref="notificationAlert" />
        </div>
      </>
    );
  }
}

export default Notifications;
