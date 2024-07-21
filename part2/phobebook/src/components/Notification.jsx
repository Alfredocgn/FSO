

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;