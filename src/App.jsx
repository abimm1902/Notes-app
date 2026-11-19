
import { useState } from "react";
import "./App.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";
import NotesGrid from "./NotesGrid";
import PinnedNotes from "./PinnedNotes";

import initialNotes from "./data";

function App() {
  const [notes, setNotes] = useState(initialNotes);

const handleDelete = (id) => {
  setNotes(notes.filter((note) => note.id !== id));
};

const handlePin = (id) => {
  setNotes(
    notes.map((note) =>
      note.id === id
        ? { ...note, isPinned: !note.isPinned }
        : note
    )
  );
};


const handleAddNote = (newNote) => {
  const note = {
    ...newNote,
    id: Date.now(),
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    isPinned: false,
  };

  setNotes((previousNotes) => [...previousNotes, note]);
};
const [editingNote, setEditingNote] = useState(null);
const handleEdit = (id) => {
  const selectedNote = notes.find((note) => note.id === id);

  setEditingNote(selectedNote);
};

const handleUpdateNote = (updatedNote) => {
  setNotes((previousNotes) =>
    previousNotes.map((note) =>
      note.id === editingNote.id
        ? { ...note, ...updatedNote }
        : note
    )
  );

  setEditingNote(null);
};

const [searchText, setSearchText] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const filteredNotes = notes.filter((note) => {
  const matchesSearch =
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.content.toLowerCase().includes(searchText.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    note.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

const handleCancelEdit = () => {
  setEditingNote(null);
};




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
          <NoteForm onAddNote={handleAddNote}
          editingNote={editingNote} 
           onUpdateNote={handleUpdateNote}
           onCancelEdit={handleCancelEdit}/>

       <PinnedNotes
notes={filteredNotes}
  onPin={handlePin}
  onDelete={handleDelete}
    onEdit={handleEdit}
/>

  <NotesGrid
 notes={filteredNotes.filter((note) => !note.isPinned)}
  onDelete={handleDelete}
  onPin={handlePin}
   onEdit={handleEdit}
/>
        </main>
      </div>
    </div>
  );
}

export default App;

