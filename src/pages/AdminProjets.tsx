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

type FormData = {
  tag: string;
  title: string;
  description: string;
  icon: string;
  published: boolean;
};

const emptyForm: FormData = {
  tag: "",
  title: "",
  description: "",
  icon: "",
  published: true,
};

export default function AdminProjets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjet, setEditingProjet] =
    useState<Projet | null>(null);

  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  async function fetchProjets() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/projets/admin`,
        {
          credentials: "include",
        }
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

  useEffect(() => {
    fetchProjets();
  }, []);

  function openCreateForm() {
    setEditingProjet(null);
    setFormData(emptyForm);
    setIsFormOpen(true);
  }

  function openEditForm(projet: Projet) {
    setEditingProjet(projet);

    setFormData({
      tag: projet.tag,
      title: projet.title,
      description: projet.description,
      icon: projet.icon,
      published: projet.published,
    });

    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProjet(null);
    setFormData(emptyForm);
  }

  function handleChange(
    field: keyof FormData,
    value: string | boolean
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const isEditing = Boolean(editingProjet);

      const response = await fetch(
        isEditing
          ? `${API_URL}/api/projets/${editingProjet?.id}`
          : `${API_URL}/api/projets`,
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error ||
            "Une erreur est survenue lors de l'enregistrement."
        );
      }

      await fetchProjets();
      closeForm();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    }
  }

  async function handleDelete(projet: Projet) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le projet « ${projet.title} » ?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(projet.id);

      const response = await fetch(
        `${API_URL}/api/projets/${projet.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error ||
            "Impossible de supprimer le projet."
        );
      }

      setProjets((current) =>
        current.filter(
          (item) => item.id !== projet.id
        )
      );
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#120d1b] text-white">
      <header className="border-b border-white/10 bg-[#211530]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#EBBB4E] uppercase">
              HUGO HEMATOBIO
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Gestion des projets
            </h1>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            ← Retour
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Projets
            </h2>

            <p className="mt-2 text-white/60">
              Gérez les projets et axes scientifiques
              présentés sur le site.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-[#EBBB4E] px-5 py-3 text-sm font-semibold text-[#211530] transition hover:bg-[#f2ca6b]"
          >
            + Ajouter un projet
          </button>
        </div>

        {loading && (
          <p className="text-white/60">
            Chargement des projets...
          </p>
        )}

        {!loading && error && (
          <p className="text-red-300">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          projets.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#211530] p-8 text-center">
              <p className="text-white/50">
                Aucun projet pour le moment.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          projets.length > 0 && (
            <div className="space-y-4">
              {projets.map((projet) => (
                <article
                  key={projet.id}
                  className="rounded-2xl border border-white/10 bg-[#211530] p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EBBB4E]/30 bg-[#EBBB4E]/10 text-lg font-bold text-[#EBBB4E]">
                        {projet.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                            {projet.tag}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              projet.published
                                ? "bg-green-400/10 text-green-300"
                                : "bg-white/5 text-white/40"
                            }`}
                          >
                            {projet.published
                              ? "Publié"
                              : "Brouillon"}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold">
                          {projet.title}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">
                          {projet.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(projet)
                        }
                        className="rounded-lg border border-[#EBBB4E]/30 px-4 py-2 text-sm text-[#EBBB4E] transition hover:bg-[#EBBB4E]/10"
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(projet)
                        }
                        disabled={
                          deletingId === projet.id
                        }
                        className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {deletingId === projet.id
                          ? "Suppression..."
                          : "Supprimer"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#211530] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingProjet
                    ? "Modifier le projet"
                    : "Ajouter un projet"}
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  Renseignez les informations du projet.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="text-2xl text-white/40 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Catégorie
                </label>

                <input
                  type="text"
                  value={formData.tag}
                  onChange={(event) =>
                    handleChange(
                      "tag",
                      event.target.value
                    )
                  }
                  placeholder="Recherche collaborative"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#120d1b] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#EBBB4E]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Titre
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    handleChange(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="Nom du projet"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#120d1b] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#EBBB4E]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Description
                </label>

                <textarea
                  value={formData.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Présentation du projet..."
                  required
                  rows={5}
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#120d1b] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#EBBB4E]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Icône
                </label>

                <input
                  type="text"
                  value={formData.icon}
                  onChange={(event) =>
                    handleChange(
                      "icon",
                      event.target.value
                    )
                  }
                  placeholder="A"
                  maxLength={20}
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#120d1b] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-[#EBBB4E]/50"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-[#120d1b] p-4">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(event) =>
                    handleChange(
                      "published",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-[#EBBB4E]"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Publier le projet
                  </span>

                  <span className="mt-1 block text-xs text-white/40">
                    Le projet sera visible sur le site
                    public.
                  </span>
                </span>
              </label>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 transition hover:text-white"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#EBBB4E] px-5 py-2.5 text-sm font-semibold text-[#211530] transition hover:bg-[#f2ca6b]"
                >
                  {editingProjet
                    ? "Enregistrer"
                    : "Créer le projet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}