import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface FormData {
  category: string;
  title: string;
  description: string;
  authors: string;
  year: string;
  link: string;
  icon: string;
  published: boolean;
}

const emptyForm: FormData = {
  category: "",
  title: "",
  description: "",
  authors: "",
  year: "",
  link: "",
  icon: "",
  published: true,
};

export default function AdminContenus() {
  const navigate = useNavigate();

  const [contenus, setContenus] = useState<Contenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  async function loadContenus() {
    try {
      const response = await fetch(
        `${API_URL}/api/contenus/admin`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de récupérer les contenus.");
      }

      const data = await response.json();
      setContenus(data);
    } catch (error) {
      console.error(error);
      alert("Impossible de charger les contenus.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContenus();
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(contenu: Contenu) {
    setEditingId(contenu.id);

    setFormData({
      category: contenu.category,
      title: contenu.title,
      description: contenu.description,
      authors: contenu.authors ?? "",
      year: contenu.year?.toString() ?? "",
      link: contenu.link ?? "",
      icon: contenu.icon,
      published: contenu.published,
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const payload = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        authors: formData.authors || null,
        year: formData.year
          ? Number(formData.year)
          : null,
        link: formData.link || null,
        icon: formData.icon,
        published: formData.published,
      };

      const url = editingId
        ? `${API_URL}/api/contenus/${editingId}`
        : `${API_URL}/api/contenus`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Une erreur est survenue."
        );
      }

      await loadContenus();
      closeForm();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Impossible d'enregistrer le contenu."
      );
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce contenu ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/contenus/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Impossible de supprimer le contenu."
        );
      }

      await loadContenus();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer le contenu."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#09070d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="mb-4 text-sm text-white/50 transition hover:text-white"
            >
              ← Retour au dashboard
            </button>

            <h1 className="text-3xl font-semibold">
              Publications & ressources
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Gérez les publications, thèses et ressources
              scientifiques du réseau.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="rounded-lg bg-[#A93D75] px-5 py-3 text-sm font-medium transition hover:bg-[#c04a88]"
          >
            + Ajouter un contenu
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-[#15101d] p-6">
            <h2 className="mb-6 text-xl font-semibold">
              {editingId
                ? "Modifier le contenu"
                : "Ajouter un contenu"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Catégorie
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Publication scientifique"
                    required
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Icône
                  </label>

                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="P"
                    maxLength={20}
                    required
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Titre
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Titre de la publication"
                  required
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Courte description ou résumé..."
                  required
                  rows={4}
                  className="w-full resize-y rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Auteurs
                  </label>

                  <input
                    type="text"
                    name="authors"
                    value={formData.authors}
                    onChange={handleChange}
                    placeholder="Nom des auteurs"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Année
                  </label>

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2026"
                    min="1900"
                    max="2100"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Lien externe
                </label>

                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://doi.org/... ou https://pubmed.ncbi.nlm.nih.gov/..."
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#A93D75]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                Publier ce contenu
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-[#A93D75] px-5 py-3 text-sm font-medium transition hover:bg-[#c04a88]"
                >
                  {editingId
                    ? "Enregistrer les modifications"
                    : "Créer le contenu"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-white/50">
            Chargement des contenus...
          </p>
        ) : contenus.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#15101d] p-8 text-center text-white/50">
            Aucun contenu pour le moment.
          </div>
        ) : (
          <div className="space-y-4">
            {contenus.map((contenu) => (
              <article
                key={contenu.id}
                className="rounded-2xl border border-white/10 bg-[#15101d] p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A93D75]/20 text-lg font-semibold text-[#EBBB4E]">
                      {contenu.icon}
                    </div>

                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                          {contenu.category}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            contenu.published
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {contenu.published
                            ? "Publié"
                            : "Brouillon"}
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold">
                        {contenu.title}
                      </h2>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
                        {contenu.description}
                      </p>

                      {(contenu.authors || contenu.year) && (
                        <p className="mt-3 text-xs text-white/40">
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
                          className="mt-3 inline-flex text-sm text-[#EBBB4E] transition hover:text-[#f5d477]"
                        >
                          Ouvrir le lien →
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => openEditForm(contenu)}
                      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDelete(contenu.id)}
                      className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}