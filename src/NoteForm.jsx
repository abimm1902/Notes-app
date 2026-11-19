
import { useState ,useEffect} from "react";
import "./NoteForm.css";

function NoteForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#d9c8ff");

useEffect(() => {
  if (props.editingNote) {
    setTitle(props.editingNote.title);
    setContent(props.editingNote.content);
    setCategory(props.editingNote.category);
    setColor(props.editingNote.color);
  }
}, [props.editingNote]);

useEffect(() => {
  if (!props.editingNote) {
    setTitle("");
    setContent("");
    setCategory("");
    setColor("#d9c8ff");
  }
}, [props.editingNote]);

const handleSubmit = (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim() || !category) {
    alert("Please fill in all fields");
    return;
  }

  const noteDetails = {
    title,
    content,
    category,
    color,
  };

  if (props.editingNote) {
    props.onUpdateNote(noteDetails);
  } else {
    props.onAddNote(noteDetails);
  }

  setTitle("");
  setContent("");
  setCategory("");
  setColor("#d9c8ff");
};


  return (
   <form className="note-form" onSubmit={handleSubmit}>
      <h2>Add a New Note</h2>

      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note here..."
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Ideas">Ideas</option>
      </select>

      <div className="color-section">
        <p>Choose Note Color</p>

        <div className="color-options">
          <span
  className={`color purple ${color === "#d9c8ff" ? "selected" : ""}`}
  onClick={() => setColor("#d9c8ff")}
></span>

          <span
  className={`color yellow ${color === "#fff0a8" ? "selected" : ""}`}
  onClick={() => setColor("#fff0a8")}
></span>

         <span
  className={`color green ${color === "#c8f2d0" ? "selected" : ""}`}
  onClick={() => setColor("#c8f2d0")}
></span>

          <span
  className={`color pink ${color === "#ffcbd8" ? "selected" : ""}`}
  onClick={() => setColor("#ffcbd8")}
></span>
        </div>
      </div>
<button type="submit" className="save-btn">
   {props.editingNote ? "Save Changes" : "Save Note"}
</button>
{props.editingNote && (
  <button
    type="button"
    className="cancel-btn"
    onClick={props.onCancelEdit}
  >
    Cancel
  </button>
)}

</form>
  );
}

export default NoteForm;
