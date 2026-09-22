
import { useEffect, useState } from "react";
import API_URL from "../config/api";

interface Actualite {
  id: number;
  tag: string;
  title: string;
  description: string;
  info: string | null;
  accent: string | null;
  icon: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function Actus() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchActualites() {
      try {
        const response = await fetch(
          `${API_URL}/api/actualites`
        );

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer les actualités."
          );
        }

        const data = await response.json();

        setActualites(data);
      } catch (error) {
        console.error(error);

        setError(
          "Impossible de charger les actualités pour le moment."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchActualites();
  }, []);

  return (
    <div className="actus-page">

      {/* En-tête */}
      <section className="actus-header">
        <span className="actus-badge">
          HUGO HEMATOBIO
        </span>

        <h1>
          Actualités <span>& événements</span>
        </h1>

        <p>
          Retrouvez les dernières actualités du réseau, les événements
          scientifiques et les appels à projets.
        </p>
      </section>

      {/* Actualités */}
      <section className="actus-grid">

        {loading && (
          <p>
            Chargement des actualités...
          </p>
        )}

        {!loading && error && (
          <p>
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          actualites.map((actualite) => (
            <article
              key={actualite.id}
              className="actus-card"
              style={
                {
                  "--card-accent":
                    actualite.accent ?? "var(--violet)",
                } as React.CSSProperties
              }
            >
              <div className="actus-card-top">
                <span className="actus-tag">
                  {actualite.tag}
                </span>

                <div className="actus-icon">
                  {actualite.icon ?? "✦"}
                </div>
              </div>

              <h2>
                {actualite.title}
              </h2>

              <p>
                {actualite.description}
              </p>

              <div className="actus-card-footer">
                <span>
                  {actualite.info ?? ""}
                </span>

                <span className="actus-arrow">
                  →
                </span>
              </div>
            </article>
          ))}

      </section>

      {/* Bandeau inférieur */}
      <section className="actus-footer">
        <div>
          <span className="actus-footer-label">
            RÉSEAU HUGO HEMATOBIO
          </span>

          <h2>
            La recherche au cœur
            <br />
            de la collaboration.
          </h2>
        </div>

        <div className="actus-footer-decoration">
          <span />
          <span />
          <span />
        </div>
      </section>

    </div>
  );
}

