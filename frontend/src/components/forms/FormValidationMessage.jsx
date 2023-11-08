import React from "react";

export function FormValidationMessage({ message, type = "error", isVisible }) {
  if (!isVisible) {
    return null;
  }

  const baseClass = "form-validation-message";
  const messageTypeClass = `${baseClass}--${type}`;

  return (
    <div className={`${baseClass} ${messageTypeClass}`} aria-live="polite">
      {message}
    </div>
  );
}

export function FormValidationMessageWrapper({ messages }) {
  return (
    <div className="form-validation-message-wrapper">
      {messages.map((message) => (
        <FormValidationMessage
          key={message.id}
          message={message.text}
          type={message.type}
          isVisible={message.isVisible}
        />
      ))}
    </div>
  );
}
