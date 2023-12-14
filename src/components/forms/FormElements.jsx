import React from "react";

// Input component
const Input = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

// Submit component
const Submit = ({ value }) => {
  return (
    <div>
      <input type="submit" value={value} />
    </div>
  );
};

export { Input, Submit };
