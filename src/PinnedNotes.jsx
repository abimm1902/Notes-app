
import "./PinnedNotes.css";
import NoteCard from "./NoteCard";

function PinnedNotes() {
  const pinnedNote = {
    id: 1,
    title: "Important Project Task",
    content: "Complete the Notes App UI and push the project to GitHub.",
    category: "Work",
    date: "18 Nov 2026",
    color: "#fff0a8",
  };

  return (
    <section className="pinned-section">
      <h2>📌 Pinned Notes</h2>

      <div className="pinned-card">
        <NoteCard
          title={pinnedNote.title}
          content={pinnedNote.content}
          category={pinnedNote.category}
          date={pinnedNote.date}
          color={pinnedNote.color}
        />
      </div>
    </section>
  );
}

export default PinnedNotes;
