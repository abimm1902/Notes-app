
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteNote } from "../api";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch note details
  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);

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

  // Delete note
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await deleteNote(id);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <p>Loading note...</p>;
  }

  if (!note) {
    return (
      <div>
        <h2>Note not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div
      className="note-detail"
      style={{ backgroundColor: note.color }}
    >
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <p>Category: {note.category}</p>

      <p>Date: {note.date}</p>

      <p>
        Status: {note.isPinned ? "Pinned" : "Not Pinned"}
      </p>

      <button onClick={() => navigate(`/edit/${id}`)}>
        Edit Note
      </button>

      <button
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete Note"}
      </button>

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default NoteDetail;
