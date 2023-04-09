import React, { useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesContext = createContext(null);

const checkDarkTheme = () => {
  let dark = localStorage.getItem("dark");
  if (dark == "true") {
    document.body.classList.add("dark");
    return true;
  }
  return false;
};

const getNotes = () => {
  let notes = JSON.parse(localStorage.getItem("notes"));
  return notes ? notes : [];
};

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(getNotes());
  const [dark, setDark] = useState(checkDarkTheme());

  const changeTheme = () => {
    if (!dark) {
      document.body.classList.add("dark");
      localStorage.setItem("dark", "true");
      setDark(true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("dark", "false");
      setDark(false);
    }
  };

  const searchNote = (e) => {
    let data = getNotes();
    let value = e.target.value;
    let newData = data.filter((val) => {
      if (value == "") {
        return val;
      } else if (
        val.note
          .replace(/<[^>]+>/g, "")
          .toLocaleLowerCase()
          .includes(
            value
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .toLocaleLowerCase()
          ) ||
        val.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) {
        return val;
      }
    });
    setNotes(newData);
  };

  const setLocalSt = (data) =>
    localStorage.setItem("notes", JSON.stringify(data));

  const deleteNote = (noteId) => {
    let myData = notes.filter((note) => note.id !== noteId);
    setNotes(myData);
    setLocalSt(myData);
    toast.success("Note Deleted Successfully!!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const addOrEditNote = (newNoteObj, msg) => {
    let myData = [];
    if (msg == "Edit") {
      myData = notes.map((note) =>
        note.id == newNoteObj.id ? newNoteObj : note
      );
      setNotes(myData);
      setLocalSt(myData);
    } else {
      myData = [...notes, newNoteObj];
      setNotes(myData);
      setLocalSt(myData);
    }
    toast.success(`Note ${msg}ed Successfully!!`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const addNoteErr = (err) => {
    toast.warn(err, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  let values = {
    notes,
    deleteNote,
    addOrEditNote,
    addNoteErr,
    dark,
    changeTheme,
    searchNote,
  };
  return (
    <NotesContext.Provider value={values}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </NotesContext.Provider>
  );
}

export { NotesContext, NotesProvider };
