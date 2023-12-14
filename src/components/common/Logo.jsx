import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Logo = ({ logoSize = "normal" }) => (
  <nav aria-label="Main navigation">
    <div className={`logo ${logoSize === "small" ? "logo--small" : ""}`}>
      <Link
        to="/"
        className="logo__link"
        aria-label="Home - Avg.js Enjoyers Webshop"
      >
        <div>
          <span className="logo__bold">Avg.js Enjoyers</span>
          <span className="logo__light">Webshop</span>
        </div>
      </Link>
    </div>
  </nav>
);

Logo.propTypes = {
  logoSize: PropTypes.oneOf(["normal", "small"]),
};

export default Logo;
