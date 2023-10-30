import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import Logo from "components/common/Logo";

function Header() {
  return (
    <header className="header">
      <nav>
        <Navbar className="header__top " expand="lg" collapseOnSelect>
          <Logo logoSize="small" />
        </Navbar>
        <Navbar className="header__bot" expand="lg" collapseOnSelect>
          <pre>
            {`
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
 |                                                                           |
 |                            THIS IS THE HEADER                             |
 |                                                                           |
 |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
      `}
          </pre>
        </Navbar>
      </nav>
    </header>
  );
}

export default Header;
