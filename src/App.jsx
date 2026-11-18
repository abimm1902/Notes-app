
import "./App.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";
import NotesGrid from "./NotesGrid";
import PinnedNotes from "./PinnedNotes";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <NoteForm />
          <PinnedNotes />
          <NotesGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
