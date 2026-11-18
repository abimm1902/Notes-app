import "./NoteForm.css";

function NoteForm() {
  return (
    <div className="note-form">

      <h2>Add a New Note</h2>

      {/* Note Title */}
      <input
        type="text"
        placeholder="Enter note title"
      />

      {/* Note Content */}
      <textarea
        placeholder="Write your note here..."
        rows="4"
      ></textarea>

      {/* Category Dropdown */}
      <select>
        <option value="">Select Category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="ideas">Ideas</option>
      </select>

      {/* Note Colors */}
      <div className="color-section">
        <p>Choose Note Color</p>

        <div className="color-options">
          <span className="color purple"></span>
          <span className="color yellow"></span>
          <span className="color green"></span>
          <span className="color pink"></span>
        </div>
      </div>

      {/* Save Button */}
      <button className="save-btn">
        Save Note
      </button>

    </div>
  );
}

export default NoteForm;