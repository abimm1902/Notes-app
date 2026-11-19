
import "./Sidebar.css";

function Sidebar(props) {
  const categories = ["All", "Work", "Personal", "Ideas"];

  return (
    <div className="sidebar">
      <h3>Categories</h3>

      <ul>
        {categories.map((category) => {
          const count =
            category === "All"
              ? props.notes.length
              : props.notes.filter(
                  (note) => note.category === category
                ).length;

          return (
            <li
              key={category}
              className={
                props.selectedCategory === category ? "active" : ""
              }
              onClick={() => props.onCategoryChange(category)}
            >
              {category} <span>{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
