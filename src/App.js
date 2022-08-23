import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import NoteEditor from "./components/NoteEditor";

const MAX_NOTES = 1000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes:
        localStorage.getItem("notes") !== null
          ? JSON.parse(localStorage.getItem("notes"))
          : [],

      // [
      //   {
      //     id: 2,
      //     title: "2022 journal",
      //     text: "this is the main text\n that is inside\n the note\n i want it to be good\n asjkdfasljfas ljfajhfd afdhajfdhajfhajfhhfd ahf akhf ka shd",
      //     creationDate: new Date().toLocaleDateString(),
      //   },
      //   {
      //     id: 5,
      //     title: "todays goals",
      //     text: "i want to: \n go out,\n exercise,\n and sleep \n today",
      //     creationDate: new Date().toLocaleDateString(),
      //   },
      //   {
      //     id: 4,
      //     title: "my mind about Hamza",
      //     text: "i just want to\nwrite somethin\ngosh im tired...",
      //     creationDate: new Date().toLocaleDateString(),
      //   },
      //   {
      //     id: 3,
      //     title: "some new idea...",
      //     text: "what if i actualy go to sleep insted of coding this bullshit ay?",
      //     creationDate: new Date().toLocaleDateString(),
      //   },
      // ],
      selectedNote: "", // the note that the editor opens
    };

    if (localStorage.getItem("notes") !== null) {
      this.setState({ notes: JSON.parse(localStorage.getItem("notes")) });
    }
  }

  returnRandomUnUsedId() {
    let randomId = Math.floor(Math.random() * MAX_NOTES) + 1;
    while (this.state.notes.filter((e) => e.id === randomId).length !== 0) {
      randomId = Math.floor(Math.random() * MAX_NOTES) + 1;
    }

    return randomId;
  }

  componentDidMount() {
    // add timer to check for screen size changing
    this.timerID = setInterval(() => this.tick(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // update screen width every 100ms
    this.setState({
      screenWidth: document.documentElement.clientWidth,
    });
  }

  handleNoteClick(note) {
    this.setState({ selectedNote: note });
  }

  handleGoBackButton() {
    this.setState({ selectedNote: "" });
  }

  handleEditorSave(newNote) {
    // runs when user saves a note in editing page
    let newNotes = this.state.notes;
    console.log(newNote);

    newNotes[newNotes.filter((n) => n.id).indexOf(newNote.id)] = newNote;

    this.setState({ notes: newNotes }, this.updateLocalStorage());
  }

  handleNoteRemove(note) {
    let newNotes = this.state.notes;
    newNotes = newNotes.filter((n) => n.id !== note.id);
    this.setState({ notes: newNotes }, () => {
      this.updateLocalStorage();
    });
  }

  handleNoteCopy(note) {
    let newNote = note;
    newNote.title += "- Copy";
    newNote.id = this.returnRandomUnUsedId();
    let newNotes = this.state.notes;
    newNotes.push(note);

    this.setState({ notes: newNotes }, this.updateLocalStorage());
  }

  handleAddNote() {
    let newNotes = this.state.notes;
    if (newNotes.length > MAX_NOTES - 1) {
      alert(`Error: You Can't Have More Than ${MAX_NOTES} Notes`);
      return;
    }
    let newNote = {
      text: "",
      title: "Title",
      id: this.returnRandomUnUsedId(),
      creationDate: new Date().toLocaleDateString(),
    };

    newNotes.push(newNote);

    this.setState(
      { selectedNote: newNote, notes: newNotes },
      this.updateLocalStorage()
    );
  }

  updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  }

  render() {
    return (
      <div className="app">
        {/* show homepage or noteEditing page or both based on screen width and user selection */}

        {(this.state.selectedNote === "" || this.state.screenWidth > 1200) && (
          <HomePage
            notes={this.state.notes}
            onNoteClick={(n) => this.handleNoteClick(n)}
            onNoteRemove={(n) => this.handleNoteRemove(n)}
            onAddNote={() => this.handleAddNote()}
            onNoteCopy={(n) => this.handleNoteCopy(n)}
          />
        )}

        {this.state.selectedNote !== "" && (
          <NoteEditor
            onEditorSave={(e, note) => this.handleEditorSave(e, note)}
            note={this.state.selectedNote}
            onGoBack={() => this.handleGoBackButton()}
          />
        )}
      </div>
    );
  }
}

export default App;
