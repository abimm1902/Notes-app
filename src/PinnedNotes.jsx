
import "./PinnedNotes.css";
import NoteCard from "./NoteCard";

function PinnedNotes(props) {
  const pinnedNotes = props.notes.filter(
    (note) => note.isPinned
  );


  return (
    <section className="pinned-section">
      <h2>Pinned Notes</h2>

    <div className="pinned-grid">
        {pinnedNotes.length === 0 ? (
          <p>No pinned notes yet</p>
        ) : (
          pinnedNotes.map((note) => (
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
              onDelete={props.onDelete}
              onEdit={props.onEdit}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default PinnedNotes;
