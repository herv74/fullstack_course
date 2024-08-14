const Notification = ({ message, messageType }) => {
  if (message == null) {
    return null;
  }

  const notificationColor = messageType == 0 ? "green" : "red";

  const notificationStyle = {
    color: notificationColor,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className="message" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
