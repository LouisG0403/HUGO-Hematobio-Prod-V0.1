import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Fonction pour savoir si on est sur la page du lien
  const checkActive = (path: string) => {
    return location.pathname === path ? "nav-item active-page" : "nav-item";
  };

  return (
    <header className="custom-header">
      <div className="header-container">
        
        {/* Zone Logo : Aligné horizontalement au centre */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="src/assets/images/logo_hematobio.png"
            alt="HUGO HEMATOBIO"
            style={{ height: "55px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Navigation avec Highlight CSS */}
        <nav className="custom-nav">
          <Link to="/" className={checkActive("/")}>
            Accueil
          </Link>
          <Link to="/reseau" className={checkActive("/reseau")}>
            Le réseau
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
        </nav>

      </div>
    </header>
  );
}