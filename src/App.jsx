
import { useState, useEffect } from "react";
import "./App.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";
import NotesGrid from "./NotesGrid";
import PinnedNotes from "./PinnedNotes";

import { getNotes, createNote, updateNote, deleteNote, } from "./api";

function App() {
  // 1. State management
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingNote, setEditingNote] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


  const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState(null); 


  // 2. Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNotes();

        // Convert API pinned property to isPinned
        const formattedNotes = data.map((note) => ({
          ...note,
          isPinned: note.isPinned ?? note.pinned ?? false,
        }));

        setNotes(formattedNotes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // 3. Delete note (local update for now)
  
const handleDelete = async (id) => {
  try {
    setSaveError(null);

    // Send DELETE request to JSON Server
    await deleteNote(id);

    // Update React state only after successful response
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );

  } catch (error) {
    setSaveError(error.message);
  }
};


  // 4. Pin / Unpin note (local update for now)
  
const handlePin = async (id) => {
  const selectedNote = notes.find((note) => note.id === id);

  if (!selectedNote) return;

  try {
    setSaveError(null);

    const updatedNote = await updateNote(id, {
      pinned: !selectedNote.isPinned,
    });

    const formattedNote = {
      ...updatedNote,
      isPinned: updatedNote.pinned ?? false,
    };

    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? formattedNote : note
      )
    );

  } catch (error) {
    setSaveError(error.message);
  }
};


  // 5. Add note (local update for now)
  
const handleAddNote = async (newNote) => {
  try {
    setSaving(true);
    setSaveError(null);

    const savedNote = await createNote({
      ...newNote,
      pinned: false,
    });

    const formattedNote = {
      ...savedNote,
      isPinned: savedNote.pinned ?? false,
    };

    setNotes((previousNotes) => [
      ...previousNotes,
      formattedNote,
    ]);

    return true;

  } catch (error) {
    setSaveError(error.message);
    return false;

  } finally {
    setSaving(false);
  }
};


  // 6. Edit note
  const handleEdit = (id) => {
    const selectedNote = notes.find((note) => note.id === id);
    setEditingNote(selectedNote);
  };

  // 7. Update note (local update for now)
  
const handleUpdateNote = async (updatedNote) => {
  try {
    setSaving(true);
    setSaveError(null);

    const savedNote = await updateNote(
      editingNote.id,
      updatedNote
    );

    const formattedNote = {
      ...savedNote,
      isPinned: savedNote.pinned ?? savedNote.isPinned ?? false,
    };

    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === editingNote.id ? formattedNote : note
      )
    );

    setEditingNote(null);

    return true;

  } catch (error) {
    setSaveError(error.message);
    return false;

  } finally {
    setSaving(false);
  }
};


  // 8. Cancel edit
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  // 9. Search and category filtering
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 10. Render UI
  return (
    <div className="app">
      <Header
        searchText={searchText}
        onSearch={setSearchText}
      />

      <div className="main-layout">
        <Sidebar
          notes={notes}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <main className="main-content">
          <NoteForm
            onAddNote={handleAddNote}
            editingNote={editingNote}
            onUpdateNote={handleUpdateNote}
            onCancelEdit={handleCancelEdit}
            saving={saving}/>
         {saveError && <p className="error-message">{saveError}</p>}

          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Error: {error}</h2>
          ) : notes.length === 0 ? (
            <h2>No notes found. Create your first note!</h2>
          ) : filteredNotes.length === 0 ? (
            <h2>No matching notes found.</h2>
          ) : (
            <>
              <PinnedNotes
                notes={filteredNotes}
                onPin={handlePin}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

              <NotesGrid
                notes={filteredNotes.filter(
                  (note) => !note.isPinned
                )}
                onDelete={handleDelete}
                onPin={handlePin}
                onEdit={handleEdit}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
