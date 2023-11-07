import React from "react";

export function Card({ className, children, ...props }) {
  const cardClass = `card ${className || ""}`.trim();
  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  const cardHeaderClass = `card__header ${className || ""}`.trim();
  return (
    <div className={cardHeaderClass} {...props}>
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
  textAlign = "leftr",
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

  const combinedStyle = { textAlign, ...props.style }; // Combine textAlign with existing styles

  // Extract the style prop from the rest to avoid it being overwritten
  const { style: _, ...otherProps } = props;

  console.log(combinedStyle);

  // Create the element dynamically based on the level prop
  return React.createElement(
    `h${level}`,
    { className: cardTitleClass, ...props },
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
