import React from "react";
import Note from "./Note";
import { BsSearch } from "react-icons/bs";
import { RiFileAddLine } from "react-icons/ri";
import "./NotesContainer.css";

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="header-container">
          <p className="notes-header">Notes</p>
          <div className="search-container">
            <input
              className="search-field"
              value={this.state.searchTerm}
              onChange={(e) => this.handleSearchChange(e)}
            />
            <button className="search-button">
              <BsSearch />
            </button>
          </div>
        </div>
        <p className="note-amount-para">{this.props.notes.length} notes</p>
        <div className="notes-grid">
          {this.props.notes
            .filter((note) => note.title.includes(this.state.searchTerm)) // filter notes by search term
            .map((note, key) => (
              <Note
                key={key}
                note={note}
                onClick={(n) => this.props.onNoteClick(n)}
                onNoteRemove={(n) => this.props.onNoteRemove(n)}
                onNoteCopy={(n) => this.props.onNoteCopy(n)}
              />
            ))}
        </div>
        <button
          className="add-note-button"
          onClick={() => this.props.onAddNote()}
        >
          <RiFileAddLine />
        </button>
      </div>
    );
  }
}

export default NotesContainer;
