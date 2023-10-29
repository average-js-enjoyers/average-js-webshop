import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { LinkContainer } from "react-router-bootstrap";

const Logo = ({ logoSize = "normal" }) => (
  <nav aria-label="Main navigation">
    <div
      className={classNames("logo", { "logo--small": logoSize === "small" })}
    >
      <LinkContainer
        to="/"
        className="logo__link"
        aria-label="Home - Avg.js Enjoyers Webshop"
      >
        <div>
          <span className="logo__bold">Avg.js Enjoyers</span>
          <span className="logo__light">Webshop</span>
        </div>
      </LinkContainer>
    </div>
  </nav>
);

Logo.propTypes = {
  logoSize: PropTypes.oneOf(["normal", "small"]),
};

export default Logo;
