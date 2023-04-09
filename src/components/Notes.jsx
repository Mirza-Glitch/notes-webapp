import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";

function Notes() {
  const { notes, dark } = useContext(NotesContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="container h-screen bg-gray-100 dark:bg-gray-900 overflow-scroll w-full mx-auto p-3 box-border">
        {notes.length ? (
          notes.map((val, i) => {
            return (
              <div key={i}>
                <div
                  onClick={() => {
                    navigate(`/note/${val.id}`);
                  }}
                  className=" h-auto max-h-44 overflow-hidden bg-white dark:bg-black p-5 rounded-2xl m-1 break-words cursor-pointer relative"
                >
                  <p className="font-bold text-xl text-black dark:text-white">
                    {val.title}
                  </p>
                  <hr />
                  <p className="m-0 mt-2 font-medium text-black dark:text-white">
                    <span dangerouslySetInnerHTML={{ __html: val.note }} />
                    <span
                      className="absolute bottom-0 left-0 w-full h-5 bg-white dark:bg-black"
                      style={{
                        background: !dark
                          ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,248,248,1) 35%, rgba(217,217,217,1) 100%)"
                          : "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(17,17,17,1) 38%, rgba(50,50,50,1) 100%)",
                        opacity: "0.6",
                      }}
                    ></span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-3/4 w-full flex">
            <p className="m-auto font-bold text-2xl text-gray-600 dark:text-gray-200 text-center">
              No Notes Available! Click on the{" "}
              <BsPlusSquare className="inline-block h-6 w-6 text-gray-600 dark:text-gray-200 stroke-1" />{" "}
              icon to start writing Notes
            </p>
          </div>
        )}
        <div
          onClick={() => {
            navigate("/add");
          }}
          className="fixed bottom-4 right-4 bg-green-500 p-2 rounded cursor-pointer"
        >
          <BsPlusSquare className="h-8 w-8 text-white dark:text-black stroke-1" />
        </div>
      </div>
    </>
  );
}

export default Notes;
