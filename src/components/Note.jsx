import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack, BiTrash, BiEdit } from "react-icons/bi";

function Note() {
  const { notes, deleteNote } = useContext(NotesContext);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const data = notes.find((val) => val.id == noteId);

  return (
    <div className="bg-white dark:bg-black h-screen w-screen">
      <div className="bg-green-500 h-14 px-3 md:px-6 flex justify-between">
        <span className="flex flex-row w-full py-auto">
          <button className="px-1 rounded-xl cursor-pointer w-max">
            <BiArrowBack
              onClick={() => {
                navigate(-1);
              }}
              size={28}
              className="stroke-2 text-white dark:text-black border-none"
            />
          </button>
          <span className="w-full my-auto text-2xl font-bold text-white dark:text-black text-center">
            {data.title}
          </span>
        </span>
        <div className="flex flex-row px-2 my-auto">
          <BiEdit
            onClick={() => {
              navigate(`/edit/${noteId}`);
            }}
            size={30}
            className="mr-2 stroke-0 text-white dark:text-black border-none cursor-pointer"
          />
          <BiTrash
            onClick={() => {
              if (confirm("Are you sure, Yoh want to delete this note?")) {
                navigate("/");
                deleteNote(noteId);
              }
            }}
            size={30}
            className="ml-1 stroke-0 text-white dark:text-black border-none cursor-pointer"
          />
        </div>
      </div>
      {
        <div
          className="p-5 text-black dark:text-white"
          dangerouslySetInnerHTML={{ __html: data.note }}
        />
      }
    </div>
  );
}

export default Note;
