import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Logo = ({ logoSize = "normal" }) => (
  <nav aria-label="Main navigation">
    <div
      className={classNames("logo", { "logo--small": logoSize === "small" })}
    >
      <a
        href="/"
        className="logo__link"
        aria-label="Home - Avg.js Enjoyers Webshop"
      >
        <div>
          <span className="logo__bold">Avg.js Enjoyers</span>
          <span className="logo__light">Webshop</span>
        </div>
      </a>
    </div>
  </nav>
);

Logo.propTypes = {
  logoSize: PropTypes.oneOf(["normal", "small"]),
};

export default Logo;
