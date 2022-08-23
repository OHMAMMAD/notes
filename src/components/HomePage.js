import React from "react";
import NoNotesPage from "./NoNotesPage";
import NotesContainer from "./NotesContainer";

class HomePage extends React.Component {
  render() {
    const currentPage =
      this.props.notes.length === 0 ? (
        <NoNotesPage onAddNote={() => this.props.onAddNote()} />
      ) : (
        <NotesContainer
          notes={this.props.notes}
          onNoteClick={(n) => this.props.onNoteClick(n)}
          onNoteRemove={(n) => this.props.onNoteRemove(n)}
          onAddNote={() => this.props.onAddNote()}
          onNoteCopy={(n) => this.props.onNoteCopy(n)}
        />
      );
    return (
      <div className="homepage">
        <div className="contents-container">{currentPage}</div>
      </div>
    );
  }
}

export default HomePage;
