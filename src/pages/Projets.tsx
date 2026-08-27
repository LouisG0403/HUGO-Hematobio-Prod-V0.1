export default function Projets() {
  return (
    <section id="projets" className="page-section">
      <div className="section-heading">
        <span className="section-eyebrow">Recherche & innovation</span>

        <h2>Projets & axes scientifiques</h2>

        <p className="sub">
          Hémostase · Hématologie cellulaire · Biologie moléculaire
        </p>
      </div>

      <div className="grid project-grid">
        <article className="card project-card">
          <div className="project-icon">A</div>

          <div>
            <span className="project-tag">Recherche collaborative</span>
            <h3>Projet collaboratif A</h3>

            <p>
              Objectifs, investigateurs, centres participants et état
              d'avancement du projet.
            </p>
          </div>
        </article>

        <article className="card project-card">
          <div className="project-icon">B</div>

          <div>
            <span className="project-tag">Recherche collaborative</span>
            <h3>Projet collaboratif B</h3>

            <p>
              Fiche descriptive du projet et informations scientifiques à
              compléter.
            </p>
          </div>
        </article>

        <article className="card project-card">
          <div className="project-icon">R</div>

          <div>
            <span className="project-tag">Ressources</span>
            <h3>Ressources scientifiques</h3>

            <p>
              Réseaux thématiques, biothèques et plateformes partenaires du
              réseau.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}