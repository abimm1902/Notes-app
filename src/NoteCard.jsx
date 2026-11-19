
import "./NoteCard.css";

function NoteCard(props) {
  return (
    <div
      className="note-card"
      style={{ backgroundColor: props.color }}
    >
      <div className="note-header">
        <h3>{props.title}</h3>

        <span onClick={() => props.onPin(props.id)}>
          {props.isPinned ? "📌" : "📍"}
        </span>
      </div>

      <p className="note-content">
        {props.content}
      </p>

      <div className="note-category">
        {props.category}
      </div>

      <div className="note-footer">
        <span>{props.date}</span>

        <div className="note-actions">
          <span onClick={() => props.onEdit(props.id)}>
            ✏️
          </span>

          <span onClick={() => props.onDelete(props.id)}>
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
