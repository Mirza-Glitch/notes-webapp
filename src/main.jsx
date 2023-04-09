import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NotesProvider } from "./context/NotesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesProvider>
      <BrowserRouter basename="/notes-webapp">
        <App />
      </BrowserRouter>
    </NotesProvider>
  </React.StrictMode>
);
