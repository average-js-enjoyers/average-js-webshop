import { Outlet, Link } from "react-router-dom";

import Button from "react-bootstrap/esm/Button";

const HomePage = () => (
  <div className="Layout">
    <nav>
      <li>
        <Link to="/example2">
          <Button variant="primary">Go To Example 2</Button>
        </Link>
      </li>
      <li>
        <Link to="/example">
          <button type="button">example</button>
        </Link>
      </li>
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
    </nav>
    <Outlet />
  </div>
);

export default HomePage;
