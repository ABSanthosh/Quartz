import "./SearchBar.scss";

function SearchBar() {
  return (
    <div className="SearchBar" data-icon={String.fromCharCode(60013)}>
      <input id="SidebarSearch" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
