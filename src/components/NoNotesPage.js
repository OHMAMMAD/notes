import NOTES_LOGO from "../notes-icon.png";
import "./NoNotesPage.css";

function NoNotesPage(props) {
  // shows when amount of notes is 0
  return (
    <div className="no-notes-page">
      <img src={NOTES_LOGO} alt="notes" className="notes-logo-img" />
      <div className="first-para-container">
        <p className="daily-notes-para">Daily Notes</p>
        <p className="discription-para">
          Take notes, reminders, set targets, collect resources, and secure
          privacy
        </p>
      </div>
      <button className="get-started-button" onClick={() => props.onAddNote()}>
        Get started
      </button>
    </div>
  );
}

export default NoNotesPage;
