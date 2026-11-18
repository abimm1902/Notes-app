import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>My Notes</h1>

      <input
        type="text"
        placeholder=" 🔍Search your notes..."
      />
    </header>
  );
}

export default Header;