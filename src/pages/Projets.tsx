import { useEffect, useState } from "react";
import API_URL from "../config/api";

interface Projet {
  id: number;
  tag: string;
  title: string;
  description: string;
  icon: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function Projets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjets() {
      try {
        const response = await fetch(
          `${API_URL}/api/projets`
        );
        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer les projets."
          );
        }

        const data = await response.json();

        setProjets(data);
      } catch (error) {
        console.error(error);

        setError(
          "Impossible de charger les projets pour le moment."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjets();
  }, []);

  return (
    <section id="projets" className="page-section">
      <div className="section-heading">
        <span className="section-eyebrow">
          Recherche & innovation
        </span>

        <h2>Projets & axes scientifiques</h2>

        <p className="sub">
          Hémostase · Hématologie cellulaire · Biologie moléculaire
        </p>
      </div>

      <div className="grid project-grid">
        {loading && (
          <p>
            Chargement des projets...
          </p>
        )}

        {!loading && error && (
          <p>
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          projets.map((projet) => (
            <article
              key={projet.id}
              className="card project-card"
            >
              <div className="project-icon">
                {projet.icon}
              </div>

              <div>
                <span className="project-tag">
                  {projet.tag}
                </span>

                <h3>{projet.title}</h3>

                <p>
                  {projet.description}
                </p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}