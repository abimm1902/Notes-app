
import "./NotesGrid.css";
import NoteCard from "./NoteCard";

function NotesGrid(props) {
  return (
    <section className="notes-section">
      <h2>All Notes</h2>

      <div className="notes-grid">
        {props.notes.length === 0 ? (
  <p className="empty-message">
    No notes found. Try another search or category.
  </p>
) : (
          props.notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              category={note.category}
              date={note.date}
              color={note.color}
              isPinned={note.isPinned}
              onPin={props.onPin}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
            
          ))
        )}
      </div>



    </section>
  );
}

export default NotesGrid;
