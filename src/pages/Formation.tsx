import { useEffect, useState } from "react";
import API_URL from "../config/api";

interface Formation {
  id: number;
  category: string;
  title: string;
  description: string;
  link: string | null;
  icon: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function Formation() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFormations() {
      try {
        const response = await fetch(`${API_URL}/api/formations`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les formations.");
        }

        const data = await response.json();
        setFormations(data);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger les formations pour le moment.");
      } finally {
        setLoading(false);
      }
    }

    fetchFormations();
  }, []);

  return (
    <section id="formation">
      <h2>Formation</h2>

      <p className="sub">
        Catalogue de formations, DIU, ressources pédagogiques.
      </p>

      <div className="grid">
        {loading && <p>Chargement des formations...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading &&
          !error &&
          formations.map((formation) => (
            <div className="card" key={formation.id}>
              <div className="project-icon">
                {formation.icon}
              </div>

              <span className="project-tag">
                {formation.category}
              </span>

              <h3>{formation.title}</h3>

              <p>{formation.description}</p>

              {formation.link && (
                <a
                  href={formation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4"
                >
                  Ouvrir le lien →
                </a>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}