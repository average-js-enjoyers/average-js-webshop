import { Outlet, Link } from "react-router-dom";

import Button from "react-bootstrap/esm/Button";

const HomePage = () => (
  <div className="Layout">
    <nav>
      <li>
        <Link to="/signup">
          <button type="button">Sign Up!</button>
        </Link>
      </li>
      <li>
        <Link to="/ui-template">
          <Button variant="dark-outline" className="btn--compact">
            Go To UI Templates
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/userdata">
          <button type="button">Userdata!</button>
        </Link>
      </li>
    </nav>
    <Outlet />
  </div>
);

export default HomePage;
