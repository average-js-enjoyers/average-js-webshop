function SearchBar() {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <select className="search-bar__select">
        <option value="All" selected>
          All categories...
        </option>
        <option value="Computers">Computers</option>
        <option value="Mobile devices">Mobile devices</option>
        <option value="Household appliances">Household appliances</option>
      </select>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search for anything . . ."
      />
      <button className="search-bar__button">
        <i className="search-bar__icon icon-search">O</i>
      </button>
    </form>
  );
}

export default SearchBar;
