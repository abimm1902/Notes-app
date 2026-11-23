
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import Home from "./Pages/Home";
import NoteDetail from "./Pages/NoteDetail";
import NewNote from "./Pages/NewNote";
import EditNote from "./Pages/EditNote";
import PinnedNotesPage from "./Pages/PinnedNotesPage";
import NotFound from "./Pages/NotFound";

import {
  getNotes,
  updateNote,
  deleteNote,
} from "./api";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch notes when the page changes
  useEffect(() => {
    async function fetchAllNotes() {
      try {
        setLoading(true);
        setError("");

        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load notes. Check JSON Server.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllNotes();
  }, [location.pathname]);

  // Pin and unpin note
  async function handlePin(id) {
    const note = notes.find(
      (item) => String(item.id) === String(id)
    );

    if (!note) return;

    try {
      const updatedNote = await updateNote(id, {
        isPinned: !note.isPinned,
      });

      setNotes((prevNotes) =>
        prevNotes.map((item) =>
          String(item.id) === String(id)
            ? updatedNote
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update pin");
    }
  }

  // Delete note
  async function handleDelete(id) {
    try {
      await deleteNote(id);

      setNotes((prevNotes) =>
        prevNotes.filter(
          (note) => String(note.id) !== String(id)
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete note");
    }
  }

  // Navigate to edit page
  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <>
      <Header />

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading notes...</p>}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              notes={notes}
              onPin={handlePin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />

        <Route
          path="/note/:id"
          element={<NoteDetail />}
        />

        <Route
          path="/new"
          element={<NewNote />}
        />

        <Route
          path="/edit/:id"
          element={<EditNote />}
        />

        <Route
          path="/pinned"
          element={
            <PinnedNotesPage
              notes={notes}
              onPin={handlePin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
