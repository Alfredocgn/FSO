import React from 'react';
import PropTypes from 'prop-types';

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
};

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
};

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const style = type === 'success' ? success : error;

  return <div style={style}>{message}</div>;
};

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
