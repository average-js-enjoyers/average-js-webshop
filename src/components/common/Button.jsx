import React from "react";

const Button = ({ variant, size, children, className = "", ...rest }) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
};

export default Button;
