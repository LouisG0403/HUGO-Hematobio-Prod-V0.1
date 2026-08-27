import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-glow" />

        <div className="home-hero-content">
          <span className="home-eyebrow">
            Réseau inter-hospitalo-universitaire · Grand Ouest
          </span>

          <h1>
            Fédérer la recherche en{" "}
            <span>Hématologie Biologique</span>
          </h1>

          <p>
            HUGO HEMATOBIO rassemble les équipes hospitalo-universitaires
            du Grand Ouest autour de la recherche, de l'innovation et de
            la formation en hématologie biologique.
          </p>

          <div className="home-hero-actions">
            <Link to="/reseau" className="home-primary-button">
              Découvrir le réseau
              <span>→</span>
            </Link>

            <Link to="/projets" className="home-secondary-button">
              Voir les projets
            </Link>
          </div>
        </div>

        <div className="home-hero-mark">
          <span>HUGO</span>
          <small>HEMATOBIO</small>
        </div>
      </section>

      {/* AXES */}
      <section className="home-axes">
        <div className="home-section-heading">
          <div>
            <span className="section-eyebrow">Notre activité</span>
            <h2>Axes stratégiques</h2>
          </div>

          <p>
            Trois domaines au cœur de la coopération scientifique
            et médicale du réseau.
          </p>
        </div>

        <div className="home-axis-grid">

          <article className="home-axis-card">
            <div className="axis-number">01</div>

            <div className="axis-icon">◈</div>

            <h3>Projets & Axes</h3>

            <p>
              Suivi des protocoles collaboratifs en hémostase,
              hématologie cellulaire et biologie moléculaire.
            </p>

            <Link to="/projets">
              Découvrir les projets <span>→</span>
            </Link>
          </article>

          <article className="home-axis-card">
            <div className="axis-number">02</div>

            <div className="axis-icon">+</div>

            <h3>Formation</h3>

            <p>
              DIU, séminaires et ressources pédagogiques destinés
              aux professionnels et futurs spécialistes.
            </p>

            <Link to="/formation">
              Consulter les formations <span>→</span>
            </Link>
          </article>

          <article className="home-axis-card">
            <div className="axis-number">03</div>

            <div className="axis-icon">↗</div>

            <h3>Actualités</h3>

            <p>
              Appels à projets, publications et événements
              scientifiques du réseau HUGO HEMATOBIO.
            </p>

            <Link to="/actus">
              Voir les actualités <span>→</span>
            </Link>
          </article>

        </div>
      </section>

      {/* SIGNATURE */}
      <section className="home-signature">
        <div>
          <span className="section-eyebrow">HUGO HEMATOBIO</span>

          <h2>
            Une collaboration scientifique
            <br />
            à l'échelle du Grand Ouest.
          </h2>
        </div>

        <Link to="/reseau" className="home-signature-link">
          Explorer le réseau →
        </Link>
      </section>

    </div>
  );
}