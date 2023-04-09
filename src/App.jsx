import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Notes from "./components/Notes";
import Note from "./components/Note";
import AddNote from "./components/AddNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Notes />
      </>
    ),
  },
  {
    path: "/add",
    element: <AddNote />,
  },
  {
    path: "/note/:noteId",
    element: <Note />,
  },
  {
    path: "/edit/:noteId",
    element: <AddNote />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
