import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorList from "./views/AuthorList";
import AddAuthor from "./views/AddAuthor";
import EditAuthor from "./views/EditAuthor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/authors/new" element={<AddAuthor />} />
        <Route path="/authors/edit/:id" element={<EditAuthor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
