
import "./NotesGrid.css";
import NoteCard from "./NoteCard";

function NotesGrid() {
  const notes = [
    {
      id: 1,
      title: "Learn React",
      content: "Complete React fundamentals and practice JSX.",
      category: "Work",
      date: "18 Nov 2026",
      color: "#d9c8ff",
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Buy groceries and household items.",
      category: "Personal",
      date: "17 Nov 2026",
      color: "#fff0a8",
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Explore some new project ideas.",
      category: "Ideas",
      date: "16 Nov 2026",
      color: "#c8f2d0",
    },
    {
      id: 4,
      title: "Meeting Notes",
      content: "Discuss project updates with the team.",
      category: "Work",
      date: "15 Nov 2026",
      color: "#ffcbd8",
    },
    {
      id: 5,
      title: "Personal Goals",
      content: "Plan my learning and daily activities.",
      category: "Personal",
      date: "14 Nov 2026",
      color: "#fff0a8",
    },
    {
      id: 6,
      title: "App Concept",
      content: "Create a useful application for daily tasks.",
      category: "Ideas",
      date: "13 Nov 2026",
      color: "#d9c8ff",
    },
  ];

  return (
    <section className="notes-section">
      <h2>All Notes</h2>

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            category={note.category}
            date={note.date}
            color={note.color}
          />
        ))}
      </div>
    </section>
  );
}

export default NotesGrid;
