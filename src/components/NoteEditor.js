import React from "react";
import "./NoteEditor.css";

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevNote: this.props.note, // used to update following states when a new note gets selected
      text: this.props.note.text,
      title: this.props.note.title,
    };
  }

  handleChange(e) {
    // set changes in "title" and "text" inputs
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    let newNote = this.props.note;
    newNote.title = this.state.title;
    newNote.text = this.state.text;
    this.props.onEditorSave(newNote);
  }

  render() {
    if (this.props.note !== this.state.prevNote) {
      // check if a new note is selected, and update if so
      this.state.prevNote = this.props.note;
      this.setState({
        text: this.props.note.text,
        title: this.props.note.title,
      });
    }
    return (
      <div className="note-editor">
        <div className="editor-header-container">
          <button
            className="go-back-button"
            onClick={() => this.props.onGoBack()}
          >
            &#60;
            <p className="notes-para">Notes</p>
          </button>
          <button className="editor-save-button" onClick={() => this.onSave()}>
            Save
          </button>
        </div>
        <input
          className="editor-title-input"
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleChange(e)}
        />
        <div className="editor-note-discription">
          <p>{this.props.note.creationDate}</p>
          <p>|</p>
          <p>{this.state.text.split(" ").length} words</p>
        </div>
        <div className="editor-text-container">
          <textarea
            name="text"
            className="editor-textarea"
            value={this.state.text}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
      </div>
    );
  }
}

export default NoteEditor;
