
import PinnedNotes from "../PinnedNotes";

function PinnedNotesPage(props) {
  return (
    <div className="pinned-page">
      <PinnedNotes
        notes={props.notes}
        onPin={props.onPin}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
    </div>
  );
}

export default PinnedNotesPage;
