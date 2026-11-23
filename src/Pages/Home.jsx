
import { useState } from "react";
import "./Home.css";
import Sidebar from "../Sidebar";
import NotesGrid from "../NotesGrid";
import PinnedNotes from "../PinnedNotes";

function Home(props) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchText, setSearchText] = useState("");

  const filteredNotes = props.notes.filter((note) => {
    const matchesCategory =
      selectedCategory === "All" ||
      note.category === selectedCategory;

    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <Sidebar
        notes={props.notes}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="home-content">

        <input
          type="text"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <PinnedNotes
          notes={props.notes}
          onPin={props.onPin}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />

        <NotesGrid
          notes={filteredNotes}
          onPin={props.onPin}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />

      </main>
    </div>
  );
}

export default Home;
