import { Outlet, Link } from "react-router-dom";


const HomePage = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li>
          <Link to="/example2">
            <button type="button">example2</button>
          </Link>
        </li>
        <li>
          <Link to="/example">
            <button type="button">example</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default HomePage;
