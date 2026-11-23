
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NoteForm from "../NoteForm";

function NewNote() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  async function handleAddNote(noteDetails) {
    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:3001/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      navigate("/");
      return true;
    } catch (error) {
      console.error(error);
      alert("Failed to save note");
      return false;
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="new-note-page">
      <h2>Create New Note</h2>

      <NoteForm
        onAddNote={handleAddNote}
        saving={saving}
      />
    </div>
  );
}

export default NewNote;
