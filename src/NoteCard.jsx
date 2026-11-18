import "./NoteCard.css";

function NoteCard(props) {
  return (
    <div
      className="note-card"
      style={{ backgroundColor: props.color }}
    >

      <div className="note-header">
        <h3>{props.title}</h3>
        <span>📌</span>
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
          <span>✏️</span>
          <span>🗑️</span>
        </div>
      </div>

    </div>
  );
}

export default NoteCard;