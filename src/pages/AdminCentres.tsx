import { FormEvent, useEffect, useState } from "react";
import API_URL from "../config/api";

interface Centre {
  id: number;
  name: string;
  city: string;
  structure: string | null;
  longitude: string;
  latitude: string;
  description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface CentreForm {
  name: string;
  city: string;
  structure: string;
  longitude: string;
  latitude: string;
  description: string;
  published: boolean;
}

const emptyForm: CentreForm = {
  name: "",
  city: "",
  structure: "",
  longitude: "",
  latitude: "",
  description: "",
  published: true,
};

export default function AdminCentres() {
  const [centres, setCentres] = useState<Centre[]>([]);
  const [form, setForm] = useState<CentreForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchCentres() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/centres/admin`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Impossible de récupérer les centres.");
      }

      const data: Centre[] = await response.json();
      setCentres(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les centres.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCentres();
  }, []);

  function handleChange(
    field: keyof CentreForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }

  function editCentre(centre: Centre) {
    setEditingId(centre.id);

    setForm({
      name: centre.name,
      city: centre.city,
      structure: centre.structure ?? "",
      longitude: centre.longitude,
      latitude: centre.latitude,
      description: centre.description ?? "",
      published: centre.published,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const longitude = Number(form.longitude);
      const latitude = Number(form.latitude);

      if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        throw new Error("Les coordonnées GPS doivent être valides.");
      }

      if (latitude < -90 || latitude > 90) {
        throw new Error("La latitude doit être comprise entre -90 et 90.");
      }

      if (longitude < -180 || longitude > 180) {
        throw new Error(
          "La longitude doit être comprise entre -180 et 180."
        );
      }

      const payload = {
        name: form.name.trim(),
        city: form.city.trim(),
        structure: form.structure.trim() || null,
        longitude,
        latitude,
        description: form.description.trim() || null,
        published: form.published,
      };

      if (!payload.name || !payload.city) {
        throw new Error("Le nom et la ville sont obligatoires.");
      }

      const url = editingId
        ? `${API_URL}/api/centres/${editingId}`
        : `${API_URL}/api/centres`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Une erreur est survenue."
        );
      }

      setSuccess(
        editingId
          ? "Centre modifié avec succès."
          : "Centre ajouté avec succès."
      );

      resetForm();
      await fetchCentres();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer le centre."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCentre(id: number) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce centre ?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/centres/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Impossible de supprimer le centre."
        );
      }

      setSuccess("Centre supprimé avec succès.");

      if (editingId === id) {
        resetForm();
      }

      await fetchCentres();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer le centre."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f6] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E72D80]">
            Administration
          </p>

          <h1 className="text-3xl font-bold text-[#442966] mt-2">
            Centres hospitaliers
          </h1>

          <p className="text-gray-600 mt-2">
            Gérez les CHU et établissements membres du réseau HUGO HEMATOBIO.
          </p>
        </section>

        {/* MESSAGES */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3">
            {success}
          </div>
        )}

        {/* FORMULAIRE */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#442966]">
                {editingId ? "Modifier le centre" : "Ajouter un centre"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Les coordonnées GPS permettent de positionner le centre sur la carte.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NOM / VILLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du centre *
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  placeholder="CHU de Rennes"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ville *
                </label>

                <input
                  type="text"
                  value={form.city}
                  onChange={(event) =>
                    handleChange("city", event.target.value)
                  }
                  placeholder="Rennes"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
                />
              </div>

            </div>

            {/* STRUCTURE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Structure
              </label>

              <input
                type="text"
                value={form.structure}
                onChange={(event) =>
                  handleChange("structure", event.target.value)
                }
                placeholder="CRTH"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
              />
            </div>

            {/* COORDONNÉES */}
            <div>
              <h3 className="text-sm font-bold text-[#442966] mb-3">
                Coordonnées géographiques
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Longitude *
                  </label>

                  <input
                    type="number"
                    step="0.000001"
                    value={form.longitude}
                    onChange={(event) =>
                      handleChange("longitude", event.target.value)
                    }
                    placeholder="-1.677800"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Latitude *
                  </label>

                  <input
                    type="number"
                    step="0.000001"
                    value={form.latitude}
                    onChange={(event) =>
                      handleChange("latitude", event.target.value)
                    }
                    placeholder="48.117300"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
                  />
                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                rows={4}
                placeholder="Informations complémentaires sur le centre..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-y focus:border-[#E72D80] focus:ring-2 focus:ring-[#E72D80]/20"
              />
            </div>

            {/* PUBLICATION */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) =>
                  handleChange("published", event.target.checked)
                }
                className="w-4 h-4"
              />

              <span className="text-sm font-semibold text-gray-700">
                Afficher ce centre sur le site public
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg bg-[#442966] text-white font-semibold hover:bg-[#351e4f] disabled:opacity-50 transition"
            >
              {saving
                ? "Enregistrement..."
                : editingId
                ? "Enregistrer les modifications"
                : "Ajouter le centre"}
            </button>

          </form>
        </section>

        {/* LISTE */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#442966]">
                Centres existants
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {centres.length} centre{centres.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">
              Chargement des centres...
            </p>
          ) : centres.length === 0 ? (
            <p className="text-gray-500">
              Aucun centre enregistré.
            </p>
          ) : (
            <div className="space-y-4">

              {centres.map((centre) => (
                <article
                  key={centre.id}
                  className="border border-gray-200 rounded-xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#442966] text-lg">
                          {centre.name}
                        </h3>

                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            centre.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {centre.published
                            ? "Publié"
                            : "Masqué"}
                        </span>
                      </div>

                      <p className="text-gray-600 mt-1">
                        {centre.city}
                        {centre.structure &&
                          ` · ${centre.structure}`}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        GPS : {centre.longitude}, {centre.latitude}
                      </p>

                      {centre.description && (
                        <p className="text-sm text-gray-500 mt-2">
                          {centre.description}
                        </p>
                      )}

                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">

                      <button
                        type="button"
                        onClick={() => editCentre(centre)}
                        className="px-4 py-2 rounded-lg bg-[#442966] text-white text-sm font-semibold hover:bg-[#351e4f] transition"
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCentre(centre.id)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Supprimer
                      </button>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}