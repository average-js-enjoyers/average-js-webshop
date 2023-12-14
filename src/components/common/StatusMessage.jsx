//src/components/common/StatusMessage.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";

const statusTypes = {
  success: "--success",
  error: "--danger",
  fail: "--danger",
  warning: "--warning",
  info: "--info",
};

// Add a new prop `autoClose` with a default value of `false`
const StatusMessage = ({
  status,
  message,
  cleanupFunction,
  autoClose = true,
}) => {
  const type = status;
  const statusClass = statusTypes[type] || "";
  const messageRef = useRef(null);
  const [visible, setVisible] = useState(true); // State to manage visibility

  // Close handler
  const handleClose = useCallback(() => {
    setVisible(false);
    if (cleanupFunction) {
      cleanupFunction();
    }
  }, [cleanupFunction]);

  useEffect(() => {
    const node = messageRef.current;
    node?.classList.add("status-message--enter");

    const animationDuration = 1000;
    let autoCloseTimer;

    if (autoClose) {
      autoCloseTimer = setTimeout(() => {
        // Add class to trigger exit animation
        node?.classList.add("status-message--exit");

        // Set a timeout for the duration of the exit animation
        setTimeout(handleClose, 300); // Assuming exit animation is 1s
      }, 5000);
    }

    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, [autoClose, handleClose]);

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
