import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3>Categories</h3>

      <ul>
        <li className="active">
          All <span>6</span>
        </li>

        <li>
          Work <span>2</span>
        </li>

        <li>
          Personal <span>2</span>
        </li>

        <li>
          Ideas <span>2</span>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;