
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../NoteForm";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch existing note
  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(
          `http://localhost:3001/notes/${id}`
        );

        if (!response.ok) {
          throw new Error("Note not found");
        }

        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error(error);
        setNote(null);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  // Update existing note
  async function handleUpdateNote(noteDetails) {
    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:3001/notes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      navigate(`/note/${id}`);
      return true;
    } catch (error) {
      console.error(error);
      alert("Failed to update note");
      return false;
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading note...</p>;

  if (!note) return <p>Note not found</p>;

  return (
    <div className="edit-note-page">
      <h2>Edit Note</h2>

      <NoteForm
        editingNote={note}
        onUpdateNote={handleUpdateNote}
        saving={saving}
        onCancelEdit={() => navigate(`/note/${id}`)}
      />
    </div>
  );
}

export default EditNote;
