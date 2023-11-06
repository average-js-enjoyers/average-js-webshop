import React from "react";

const Button = ({ variant, size, children, ...rest }) => {
  const classes = `btn btn-${variant} btn-${size} ${rest.className}}`;

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
