import {
  CSSProperties,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import API_URL from "../config/api";

type Admin = {
  id: number;
  email: string;
};

type ModuleStatus = {
  count?: number;
  label?: string;
};

type AdminCardProps = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  status?: string;
  onClick?: () => void;
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const [actualitesStatus, setActualitesStatus] =
    useState<ModuleStatus | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          navigate("/admin/login");
          return;
        }

        const data = await response.json();
        setAdmin(data.admin);

        await loadActualites();
      } catch (error) {
        console.error(
          "Authentication check error:",
          error
        );

        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    async function loadActualites() {
      try {
        const response = await fetch(
          `${API_URL}/api/actualites/admin`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        const publishedCount = data.filter(
          (actualite: { published: boolean }) =>
            actualite.published
        ).length;

        setActualitesStatus({
          count: publishedCount,
          label: "publiées",
        });
      } catch (error) {
        console.error(
          "Error loading actualites:",
          error
        );
      }
    }

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Vérification de la connexion...</p>
        </div>
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-inner">
          <button
            type="button"
            className="admin-dashboard-back"
            onClick={() => navigate("/")}
          >
            <span>←</span>
            Retour au site
          </button>

          <div className="admin-dashboard-separator" />

          <div className="admin-dashboard-brand">
            <p className="admin-dashboard-kicker">
              HUGO HEMATOBIO
            </p>

            <h1 className="admin-dashboard-title">
              Administration
            </h1>
          </div>

          <div className="admin-dashboard-user">
            <div className="admin-dashboard-user-info">
              <p className="admin-dashboard-user-email">
                {admin.email}
              </p>

              <p className="admin-dashboard-user-role">
                Administrateur
              </p>
            </div>

            <div className="admin-dashboard-avatar">
              {admin.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <section className="admin-dashboard-content">
        <div className="admin-dashboard-intro">
          <div>
            <p className="admin-dashboard-section-label">
              Espace de gestion
            </p>

            <h2 className="admin-dashboard-heading">
              Tableau de bord
            </h2>

            <p className="admin-dashboard-description">
              Gérez les différents contenus du site
              HUGO HEMATOBIO depuis cet espace.
            </p>
          </div>

          <div className="admin-session">
            <span className="admin-session-label">
              Session
            </span>

            <span className="admin-session-status">
              <span />
              Active
            </span>
          </div>
        </div>

        <div className="admin-modules-grid">
          <AdminCard
            title="Centres"
            description="Gérer les CHU, établissements et informations du réseau."
            icon="⌖"
            accent="#E72D80"
            onClick={() => navigate("/admin/centres")}
          />

          <AdminCard
            title="Actualités"
            description="Créer et modifier les actualités publiées sur le site."
            icon="▤"
            accent="#EBBB4E"
            status={
              actualitesStatus
                ? `${actualitesStatus.count} ${actualitesStatus.label}`
                : undefined
            }
            onClick={() => navigate("/admin/actualites")}
          />

          <AdminCard
            title="Projets"
            description="Gérer les projets scientifiques présentés sur le site."
            icon="⌬"
            accent="#DD9450"
            onClick={() => navigate("/admin/projets")}
          />

          <AdminCard
            title="Formations"
            description="Modifier les formations et leurs contenus associés."
            icon="◇"
            accent="#A93D75"
            onClick={() => navigate("/admin/formations")}
          />

          <AdminCard
            title="Publications & ressources"
            description="Gérer les publications, thèses et ressources scientifiques."
            icon="◫"
            accent="#442966"
            onClick={() => navigate("/admin/contenus")}
          />
        </div>
      </section>

      <footer className="admin-dashboard-footer">
        <span>HUGO HEMATOBIO</span>
        <span>•</span>
        <span>Portail d'administration</span>
      </footer>
    </main>
  );
}

function AdminCard({
  title,
  description,
  icon,
  accent,
  status,
  onClick,
}: AdminCardProps) {
  const cardStyle = {
    "--admin-accent": accent,
  } as CSSProperties;

  return (
    <article
      className={`admin-module-card ${
        onClick ? "is-active" : "is-disabled"
      }`}
      style={cardStyle}
    >
      <div className="admin-module-header">
        <div className="admin-module-icon">
          {icon}
        </div>

        {status && (
          <span className="admin-module-status">
            {status}
          </span>
        )}
      </div>

      <div>
        <h3 className="admin-module-title">
          {title}
        </h3>

        <p className="admin-module-description">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className="admin-module-button"
      >
        <span>
          {onClick ? "Gérer le module" : "Indisponible"}
        </span>

        {onClick && <span>→</span>}
      </button>
    </article>
  );
}