import React from "react";

export function Card({ className, children, dropShade = false, ...props }) {
  const cardClass = `card ${dropShade && "drop-shade"} ${
    className || ""
  }`.trim();
  return (
    <div className={cardClass} {...props}>
      <div className={"card-container"}>{children}</div>
    </div>
  );
}

export function CardHeader({
  className,
  children,
  align = "center",
  ...props
}) {
  const cardHeaderClass = `card__header ${className || ""}`.trim();
  return (
    <div className={cardHeaderClass} style={{ alignItems: align }} {...props}>
      {children}
    </div>
  );
}

export function CardLogo({ className, children, ...props }) {
  const cardLogoClass = `card__logo ${className || ""}`.trim();
  return (
    <div className={cardLogoClass} {...props}>
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className, ...props }) {
  const cardImageClass = `card__image ${className || ""}`.trim();

  // Ensure that 'alt' attribute is provided for accessibility reasons
  if (!alt) {
    console.warn(
      "Remember to provide an alt prop for CardImage for accessibility!"
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Card image"}
      className={cardImageClass}
      {...props}
    />
  );
}

export function CardBody({ className, children, ...props }) {
  const cardBodyClass = `card__body ${className || ""}`.trim();
  return (
    <div className={cardBodyClass} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  level = "5",
  textAlign = "left", // Adding a default value for textAlign
  children,
  ...props
}) {
  const cardTitleClass = `card__title ${className || ""}`.trim();

  // Ensure that the level is a number between 1 and 6
  let safeLevel = parseInt(level, 10);
  if (safeLevel < 1 || safeLevel > 6 || isNaN(safeLevel)) {
    console.warn("Level prop must be between 1 and 6");
    safeLevel = 5; // Default to '5' if the provided level is invalid
  }

  const combinedStyle = { textAlign: textAlign, ...props.style }; // Ensure textAlign is set

  // Create the element dynamically based on the level prop
  return React.createElement(
    `h${safeLevel}`,
    { className: cardTitleClass, ...props, style: combinedStyle }, // style is included in the props spread
    children
  );
}

export function CardFooter({ className, children, ...props }) {
  const cardFooterClass = `card__footer ${className || ""}`.trim();
  return (
    <div className={cardFooterClass} {...props}>
      {children}
    </div>
  );
}
