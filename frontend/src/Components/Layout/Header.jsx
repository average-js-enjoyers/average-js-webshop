import Logo from "components/common/Logo";

function Header() {
  return (
    <header className="header">
      <nav>
        <div className="header__top" role="navigation" aria-label="Main">
          <Logo logoSize="small" />
        </div>
        <div className="header__bot" role="navigation" aria-label="Secondary">
          <pre
            style={{
              whiteSpace: "pre",
              fontFamily: "monospace",
              lineHeight: "normal",
            }}
          >
            {`
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
 |                                                                           |
 |                            THIS IS THE HEADER                             |
 |                                                                           |
 |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
      `}
          </pre>
        </div>
      </nav>
    </header>
  );
}

export default Header;
