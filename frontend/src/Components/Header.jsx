import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import Logo from "./Logo";

function Header() {
  return (
    <header className="header">
      <nav>
        <Navbar className="header__top" expand="lg" collapseOnSelect>
          <Logo />
        </Navbar>
        <Navbar className="header__bot" expand="lg" collapseOnSelect>
          General Kenobi
        </Navbar>
      </nav>
    </header>
  );
}

export default Header;
