
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <h2 className="logo">Notes App</h2>

      <nav className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/pinned"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Pinned
        </NavLink>

        <Link to="/new" className="new-note-btn">
          + New Note
        </Link>

      </nav>

    </header>
  );
}

export default Header;
