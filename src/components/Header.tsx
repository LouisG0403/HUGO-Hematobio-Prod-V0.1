import { Link, useLocation } from "react-router-dom";
import logoHematobio from "../assets/images/logo_hematobio.png";

export default function Header() {
  const location = useLocation();

  const checkActive = (path: string) => {
    return location.pathname === path
      ? "nav-item active-page"
      : "nav-item";
  };

  return (
    <header className="custom-header">
      <div className="header-container">

        {/* Logo */}
        <Link
          to="/"
          className="header-logo"
          aria-label="HUGO HEMATOBIO - Accueil"
        >
          <img
            src={logoHematobio}
            alt="HUGO HEMATOBIO"
          />
        </Link>

        {/* Navigation */}
        <nav className="custom-nav">
          <Link to="/" className={checkActive("/")}>
            Accueil
          </Link>

          <Link to="/reseau" className={checkActive("/reseau")}>
            Réseau
          </Link>

          <Link to="/projets" className={checkActive("/projets")}>
            Projets
          </Link>

          <Link to="/formation" className={checkActive("/formation")}>
            Formation
          </Link>

          <Link to="/actus" className={checkActive("/actus")}>
            Actualités
          </Link>

          <Link to="/contenus" className={checkActive("/contenus")}>
            Publications
          </Link>
        </nav>

        {/* Accès administration */}
        <Link
          to="/admin/login"
          className="admin-access-button"
        >
          <span className="admin-access-icon">⚙</span>
          <span>Espace administrateur</span>
        </Link>

      </div>
    </header>
  );
}