
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

interface ActualiteForm {
  tag: string;
  title: string;
  description: string;
  info: string;
  published: boolean;
}

const initialForm: ActualiteForm = {
  tag: "",
  title: "",
  description: "",
  info: "",
  published: true,
};

export default function AdminActualites() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ActualiteForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [editingActualite, setEditingActualite] =
    useState<Actualite | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function fetchActualites() {
    try {
      const response = await fetch(
        `${API_URL}/api/actualites/admin`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de récupérer les actualités.");
      }

      const data = await response.json();

      setActualites(data);
    } catch (error) {
      console.error(error);
      setError("Impossible de charger les actualités.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActualites();
  }, []);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePublishedChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((current) => ({
      ...current,
      published: event.target.checked,
    }));
  }

  function openCreateForm() {
    setEditingActualite(null);
    setForm(initialForm);
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(actualite: Actualite) {
    setEditingActualite(actualite);

    setForm({
      tag: actualite.tag,
      title: actualite.title,
      description: actualite.description,
      info: actualite.info ?? "",
      published: actualite.published,
    });

    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingActualite(null);
    setForm(initialForm);
    setFormError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormError("");
    setSaving(true);

    const isEditing = editingActualite !== null;

    try {
      const url = isEditing
        ? `${API_URL}/api/actualites/${editingActualite.id}`
        : '${API_URL}/api/actualites/';

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: form.tag,
          title: form.title,
          description: form.description,
          info: form.info || null,
          accent: editingActualite?.accent ?? "var(--violet)",
          icon: editingActualite?.icon ?? "✦",
          published: form.published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Impossible de modifier l'actualité."
              : "Impossible de créer l'actualité.")
        );
      }

      if (isEditing) {
        setActualites((current) =>
          current.map((actualite) =>
            actualite.id === data.id ? data : actualite
          )
        );
      } else {
        setActualites((current) => [data, ...current]);
      }

      closeForm();
    } catch (error) {
      console.error(error);

      setFormError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(actualite: Actualite) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'actualité "${actualite.title}" ?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(actualite.id);

    try {
      const response = await fetch(
        `${API_URL}/api/actualites/${actualite.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Impossible de supprimer l'actualité."
        );
      }

      setActualites((current) =>
        current.filter(
          (item) => item.id !== actualite.id
        )
      );

      if (editingActualite?.id === actualite.id) {
        closeForm();
      }
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la suppression."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b12] text-white p-8">
        Chargement des actualités...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0b12] text-white p-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-purple-400 uppercase tracking-wider">
              Administration
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Gestion des actualités
            </h1>

            <p className="text-gray-400 mt-2">
              Créez, modifiez et publiez les actualités du réseau.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
          >
            + Nouvelle actualité
          </button>
        </div>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="mb-8 bg-[#15151f] border border-white/10 rounded-xl p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingActualite
                    ? "Modifier l'actualité"
                    : "Nouvelle actualité"}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {editingActualite
                    ? "Modifiez les informations de cette actualité."
                    : "Ajoutez une nouvelle actualité au réseau."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {formError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* TAG */}
              <div>
                <label
                  htmlFor="tag"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Tag
                </label>

                <input
                  id="tag"
                  name="tag"
                  type="text"
                  value={form.tag}
                  onChange={handleChange}
                  placeholder="Ex : Vie du réseau"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              </div>

              {/* TITRE */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Titre
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Titre de l'actualité"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description de l'actualité..."
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* INFO */}
              <div>
                <label
                  htmlFor="info"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Informations complémentaires
                </label>

                <input
                  id="info"
                  name="info"
                  type="text"
                  value={form.info}
                  onChange={handleChange}
                  placeholder="Ex : Date et programme à venir"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              </div>

              {/* PUBLICATION */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={handlePublishedChange}
                  className="w-4 h-4"
                />

                <label
                  htmlFor="published"
                  className="text-sm text-gray-300"
                >
                  Publier immédiatement
                </label>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition disabled:opacity-50"
                >
                  {saving
                    ? editingActualite
                      ? "Enregistrement..."
                      : "Création..."
                    : editingActualite
                    ? "Enregistrer les modifications"
                    : "Créer l'actualité"}
                </button>

              </div>
            </form>
          </div>
        )}

        {/* LISTE */}
        <div className="space-y-4">

          {actualites.map((actualite) => (
            <article
              key={actualite.id}
              className="bg-[#15151f] border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-6">

                <div>
                  <div className="flex items-center gap-3 mb-3">

                    <span className="text-sm text-purple-400">
                      {actualite.tag}
                    </span>

                    <span
                      className={
                        actualite.published
                          ? "text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400"
                          : "text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400"
                      }
                    >
                      {actualite.published
                        ? "Publié"
                        : "Brouillon"}
                    </span>

                  </div>

                  <h2 className="text-xl font-semibold">
                    {actualite.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {actualite.description}
                  </p>

                  {actualite.info && (
                    <p className="text-sm text-gray-500 mt-3">
                      {actualite.info}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">

                  <button
                    type="button"
                    onClick={() => openEditForm(actualite)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(actualite)}
                    disabled={deletingId === actualite.id}
                    className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
                  >
                    {deletingId === actualite.id
                      ? "Suppression..."
                      : "Supprimer"}
                  </button>

                </div>

              </div>
            </article>
          ))}

        </div>

      </div>
    </div>
  );
}

