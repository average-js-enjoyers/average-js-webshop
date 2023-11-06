//src/components/common/StatusMessage.jsx
import React, { useEffect, useRef, useState } from "react";

const statusTypes = {
  success: "--success",
  danger: "--danger",
  warning: "--warning",
  info: "--info",
};

// Add a new prop `autoClose` with a default value of `false`
const StatusMessage = ({ type, message, autoClose = false }) => {
  const statusClass = statusTypes[type] || "";
  const messageRef = useRef(null);
  const [visible, setVisible] = useState(true); // State to manage visibility

  // Close handler
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const node = messageRef.current;
    node.classList.add("status-message--enter");

    const animationDuration = 1000;
    let autoCloseTimer;

    if (autoClose) {
      // Set the auto-dismiss timer
      autoCloseTimer = setTimeout(handleClose, 10000);
    }

    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, [autoClose]);

  // If not visible, do not render the component
  if (!visible) return null;

  return (
    <div
      ref={messageRef}
      className={`status-message status-message${statusClass}`}
    >
      <button className="status-message__close" onClick={handleClose}>
        ×
      </button>
      <span className="status-message__text">{message}</span>
    </div>
  );
};

export default StatusMessage;
