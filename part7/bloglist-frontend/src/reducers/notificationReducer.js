const intialState = {
  message: null,
  type: null,
};

export const setNotification = (message, notificationType) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: { message, type: notificationType },
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

const notificationReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case 'CLEAR_NOTIFICATION':
      return intialState;
    default:
      return state;
  }
};

export default notificationReducer;
