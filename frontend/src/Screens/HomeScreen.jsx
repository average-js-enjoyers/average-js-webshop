import { Link } from "react-router-dom";

import Button from "react-bootstrap/esm/Button";

const HomeScreen = () => (
  <div className="Layout">
    <nav>
      <li>
        <Link to="/ui-template">
          <Button variant="dark-outline" className="btn--compact">
            Go To UI Templates
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/signup">
          <button type="button">Sign Up!</button>
        </Link>
      </li>
      <li>
        <Link to="/profile/edit">
          <button type="button">Userdata!</button>
        </Link>
      </li>
      <li>
        <Link to="/signin">
          <button type="button">Sign in!</button>
        </Link>
      </li>
    </nav>
  </div>
);

export default HomeScreen;
