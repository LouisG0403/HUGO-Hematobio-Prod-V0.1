import { useEffect, useState } from "react";
import API_URL from "../config/api";

interface Contenu {
    id: number;
    category: string;
    title: string;
    description: string;
    authors: string | null;
    year: number | null;
    link: string | null;
    icon: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export default function Contenus() {
    const [contenus, setContenus] = useState<Contenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchContenus() {
            try {
                const response = await fetch(
                    `${API_URL}/api/contenus`
                );

                if (!response.ok) {
                    throw new Error(
                        "Impossible de récupérer les contenus."
                    );
                }

                const data = await response.json();

                setContenus(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Impossible de charger les contenus pour le moment."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchContenus();
    }, []);

    return (
        <section id="contenus" className="page-section">
            <div className="section-heading">
                <span className="section-eyebrow">
                    Publications
                </span>

                <h2>Publications & ressources scientifiques</h2>

                <p className="sub">
                    Publications · Thèses · Articles · Ressources scientifiques
                </p>
            </div>

            <div className="grid project-grid">
                {loading && (
                    <p>
                        Chargement des ressources...
                    </p>
                )}

                {!loading && error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    contenus.map((contenu) => (
                        <article
                            key={contenu.id}
                            className="card project-card"
                        >
                            <div className="project-icon">
                                {contenu.icon}
                            </div>

                            <div>
                                <span className="project-tag">
                                    {contenu.category}
                                </span>

                                <h3>{contenu.title}</h3>

                                <p>
                                    {contenu.description}
                                </p>

                                {(contenu.authors || contenu.year) && (
                                    <p className="mt-3 text-sm opacity-60">
                                        {contenu.authors &&
                                            `Auteurs : ${contenu.authors}`}

                                        {contenu.authors &&
                                            contenu.year &&
                                            " · "}

                                        {contenu.year &&
                                            `Année : ${contenu.year}`}
                                    </p>
                                )}

                                {contenu.link && (
                                    <a
                                        href={contenu.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4"
                                    >
                                        Consulter la ressource →
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
            </div>
        </section>
    );
}