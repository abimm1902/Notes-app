
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <h1>My Notes</h1>

      <input
        type="text"
        placeholder="🔍 Search your notes..."
        value={props.searchText}
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </header>
  );
}

export default Header;
