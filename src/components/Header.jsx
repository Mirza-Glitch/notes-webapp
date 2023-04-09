import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { BsSearch } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Header() {
  const { searchNote, dark, changeTheme } = useContext(NotesContext);

  return (
    <>
      <header className="bg-green-500 h-14 p-2 px-4 md:px-10 flex justify-between">
        <span className="rounded bg-white dark:bg-black flex flex-row">
          <BsSearch className="h-full w-auto p-2 text-gray-500 cursor-pointer" />
          <span className="relative">
            <input
              className="rounded px-2 dark:bg-black focus:outline-none h-full py-auto cursor-text"
              onChange={searchNote}
              type="text"
              placeholder="Search..."
            />
            <div className="bg-sky-100 w-3/4 absolute bottom-[-2rem]"></div>
          </span>
        </span>
        <button
          onClick={() => changeTheme()}
          className="cursor-pointer rounded bg-white dark:bg-black flex p-2"
        >
          {!dark ? (
            <MdDarkMode className="h-full w-auto text-black" />
          ) : (
            <MdLightMode className="h-full w-auto text-white" />
          )}
        </button>
      </header>
    </>
  );
}

export default Header;
