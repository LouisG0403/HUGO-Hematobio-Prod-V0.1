export default function Actus() {
  const actualites = [
    {
      tag: "Vie du réseau",
      title: "Journée HUGO HEMATOBIO 2026",
      description:
        "La prochaine journée HUGO HEMATOBIO réunira les acteurs du réseau autour de la recherche et de l'innovation en hématologie.",
      info: "Date et programme à venir",
      accent: "var(--violet)",
      icon: "◉",
    },
    {
      tag: "Appel à projets",
      title: "Appel à projets inter-CHU",
      description:
        "Découvrez les nouveaux appels à projets destinés à favoriser les collaborations entre les différents centres du réseau.",
      info: "Ouverture des candidatures",
      accent: "var(--rose)",
      icon: "✦",
    },
    {
      tag: "Publication",
      title: "Dernière publication scientifique",
      description:
        "Retrouvez les dernières publications issues des travaux menés au sein du réseau HUGO HEMATOBIO.",
      info: "Résumé à venir",
      accent: "var(--jaune)",
      icon: "⌁",
    },
  ];

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
        {actualites.map((actualite) => (
          <article
            key={actualite.title}
            className="actus-card"
            style={
              {
                "--card-accent": actualite.accent,
              } as React.CSSProperties
            }
          >
            <div className="actus-card-top">
              <span className="actus-tag">
                {actualite.tag}
              </span>

              <div className="actus-icon">
                {actualite.icon}
              </div>
            </div>

            <h2>{actualite.title}</h2>

            <p>{actualite.description}</p>

            <div className="actus-card-footer">
              <span>{actualite.info}</span>
              <span className="actus-arrow">→</span>
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