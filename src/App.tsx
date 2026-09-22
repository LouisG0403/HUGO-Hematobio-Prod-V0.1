import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Accueil from "./pages/Accueil";
import Actus from "./pages/Actus";
import Formation from "./pages/Formation";
import Projets from "./pages/Projets";
import Reseau from "./pages/Reseau";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminActualites from "./pages/AdminActualites";
import AdminProjets from "./pages/AdminProjets";
import AdminFormations from "./pages/AdminFormations";
import AdminContenus from "./pages/AdminContenus";
import Contenus from "./pages/Contenus";
import AdminCentres from "./pages/AdminCentres";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE PUBLIC */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/reseau" element={<Reseau />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/actus" element={<Actus />} />
          <Route path="/contenus" element={<Contenus />} />
        </Route>

        {/* ADMINISTRATION */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/actualites"
          element={<AdminActualites />}
        />
        <Route
          path="/admin/projets"
          element={<AdminProjets />}
        />
        <Route
          path="/admin/formations"
          element={<AdminFormations />}
        />
        <Route
          path="/admin/contenus"
          element={<AdminContenus />}
        />
        <Route path="/admin/centres" element={<AdminCentres />} />
      </Routes>
    </BrowserRouter>
  );
}