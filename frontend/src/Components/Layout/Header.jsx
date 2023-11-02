import Logo from "components/common/Logo";
import SearchBar from "components/forms/SearchBar";

function Header() {
  return (
    <header className="header">
      <nav className="header__top">
        <Logo logoSize="small" />
        <SearchBar />
        <div className="header__top-right">
          <button className="header__icon-container">
            <i className="header__icon icon-user">O</i>
            <div className="header__icon-text">Sign In</div>
          </button>
          <button className="header__icon-container">
            <i className="header__icon icon-favorites">O</i>
            <div className="header__icon-text">Favorites</div>
          </button>
          <button className="header__icon-container">
            <i className="header__icon icon-shopping-cart">O</i>
            <div className="header__icon-text">Cart</div>
          </button>
        </div>
      </nav>
      <nav className="header__bot">
        <nav className="header__product-list-container">
          <button className="header__product-list-button">
            <i className="header__product-list-icon icon-menu">🍔</i>
            <div className="header__product-list-text">Products</div>
          </button>
          {/* To be completed */}
          {/* <ul className="header__product-list"> To be completed </ul> */}
        </nav>

        <ul className="header__link-list">
          <li className="header__link-item">Top Sales</li>
          <li className="header__link-item">Top Favorites</li>
          <li className="header__link-item header__link-item--highlight">
            Flash Sale
          </li>
          <li className="header__link-item">New Arrivals</li>
          <li className="header__link-item">Help Centre</li>
        </ul>

        <div className="header__flex-util">&nbsp;</div>
      </nav>
    </header>
  );
}

export default Header;
