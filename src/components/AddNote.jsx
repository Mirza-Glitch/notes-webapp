import React, { useState, useRef, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNote() {
  const { notes, addOrEditNote, addNoteErr, dark } = useContext(NotesContext);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const data = notes.find((val) => val.id == noteId);
  const [Note, setNote] = useState(noteId ? data.note : "");
  const [title, setTitle] = useState(noteId ? data.title : "");
  const [longTitle, setLongTitle] = useState(false);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "link"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ],
  };

  const uid = () => {
    return Math.random().toString(36).substr(2);
  };

  const saveNote = () => {
    if (longTitle) {
      addNoteErr("Note Title cannot be more than 18 characters!!");
    } else if (Note.trim() == "") {
      addNoteErr("Note cannot be empty");
    } else if (noteId) {
      navigate(-1);
      addOrEditNote({ id: data.id, title: title, note: Note }, "Edit");
    } else {
      navigate(-1);
      addOrEditNote({ id: uid(), title: title, note: Note }, "Add");
    }
  };

  return (
    <div
      style={{
        background: !dark
          ? "linear-gradient(120deg, rgba(253,255,252,0.46559265332344246) 0%, rgba(13,177,51,0.41598207522661257) 35%, rgba(21,250,42,0.3871759267953726) 100%)"
          : "linear-gradient(120deg, rgba(0,0,0) 0%, rgb(11, 142, 41) 35%, rgb(4, 200, 24) 100%)",
      }}
      className="h-screen w-screen p-5"
    >
      <button
        onClick={() => {
          if (Note.length) {
            if (confirm("Are you sure you want to Discard this note.")) {
              navigate(-1);
            }
          }
          navigate(-1);
        }}
        className="bg-green-500 p-2 absolute top-3 left-3 rounded-xl cursor-pointer"
      >
        <BiArrowBack
          size={24}
          className="stroke-1 text-white dark:text-black border-none"
        />
      </button>
      <div className="bg-gray-100 dark:bg-gray-900 px-3 pt-2 overflow-y-scroll rounded h-[75%]">
        <p className="text-2xl font-bold text-center mb-1 text-black dark:text-white">
          {noteId ? "Edit Note " : "Add Note"}
        </p>

        <input
          className="border border-gray-300 p-2 w-full rounded mb-2 text-black dark:text-white bg-white dark:bg-black focus:outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            title.length >= 18 ? setLongTitle(true) : setLongTitle(false);
          }}
        />
        {longTitle && (
          <span className="block h-max mb-3 text-sm text-red-500">
            Title cannot be more than 18 characters.
          </span>
        )}

        <ReactQuill
          className="bg-white dark:bg-black text-black dark:text-white w-full h-[80%] border border-gray-300 rounded overflow-y-scroll"
          value={Note}
          modules={modules}
          theme="snow"
          onChange={setNote}
          placeholder="Write Your Note..."
        />
      </div>
      <button
        onClick={() => {
          saveNote();
        }}
        className="my-3 w-full bg-green-500 dark:bg-black py-2 rounded font-medium cursor-pointer text-white"
      >
        Save Note
      </button>
    </div>
  );
}

export default AddNote;
