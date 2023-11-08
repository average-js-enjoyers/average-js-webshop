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
  let counter = 0;

  return (
    <div className="form-validation-message-wrapper">
      {messages.map((message, i) => {
        if (message.isVisible) {
          counter++;
          if (counter <= 2) {
            return (
              <FormValidationMessage
                key={message.id}
                message={message.text}
                type={message.type}
                isVisible={message.isVisible}
              />
            );
          }
        }
        return null;
      })}
    </div>
  );
}
