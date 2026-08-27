import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Accueil from "./pages/Accueil";
import Actus from "./pages/Actus";
import Formation from "./pages/Formation";
import Projets from "./pages/Projets";
import Reseau from "./pages/Reseau";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/reseau" element={<Reseau />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/actus" element={<Actus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}