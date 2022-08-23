import React from "react";
import { MdContentCopy } from "react-icons/md";
import { ImCross } from "react-icons/im";
import "./Note.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      removeMouseOver: false,
      copyMouseOver: false,
    };
  }

  handleClick() {
    if (!this.state.removeMouseOver && !this.state.copyMouseOver) {
      this.props.onClick(this.props.note);
    }
  }

  render() {
    return (
      <div
        className="note"
        onClick={() => this.handleClick()}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
      >
        <p className="note-title">{this.props.note.title}</p>
        <p className="note-text">
          {this.props.note.text.slice(0, 100)}
          {this.props.note.text.length > 100 ? "...." : ""}
        </p>
        <div
          className="note-buttons-container"
          style={{ opacity: this.state.mouseOver ? "1" : "0" }}
        >
          <button
            className="note-button"
            id="remove-note-button"
            onMouseOver={() => this.setState({ removeMouseOver: true })}
            onMouseOut={() => this.setState({ removeMouseOver: false })}
            onClick={() => this.props.onNoteRemove(this.props.note)}
          >
            <ImCross />
          </button>
          <button
            className="note-button"
            onMouseOver={() => this.setState({ copyMouseOver: true })}
            onMouseOut={() => this.setState({ copyMouseOver: false })}
            onClick={() => this.props.onNoteCopy(this.props.note)}
          >
            <MdContentCopy />
          </button>
        </div>
      </div>
    );
  }
}

export default Note;
