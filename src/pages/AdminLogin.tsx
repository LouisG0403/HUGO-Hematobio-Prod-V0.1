import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoHematobio from "../assets/images/logo_hematobio.png";
import API_URL from "../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Identifiants incorrects.");
        return;
      }

      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login">
      <button
        type="button"
        className="admin-back-button"
        onClick={() => navigate("/")}
      >
        <span>←</span>
        Retour au site
      </button>

      <div className="admin-login-container">
        <section className="admin-login-brand">
          <img
            src={logoHematobio}
            alt="HUGO HEMATOBIO"
            className="admin-login-logo"
          />

          <div>
            <p className="admin-login-kicker">
              Espace sécurisé
            </p>

            <h1 className="admin-login-brand-title">
              Administration
              <span>HUGO HEMATOBIO</span>
            </h1>

            <p className="admin-login-brand-description">
              Gérez les contenus, les actualités, les projets,
              les formations et les centres du réseau HUGO HEMATOBIO.
            </p>
          </div>

          <p className="admin-login-brand-footer">
            Portail d'administration
          </p>
        </section>

        <section className="admin-login-form-container">
          <div className="admin-login-icon">
            🔐
          </div>

          <h2 className="admin-login-form-title">
            Connexion
          </h2>

          <p className="admin-login-form-subtitle">
            Connectez-vous à votre espace administrateur.
          </p>

          <form
            onSubmit={handleSubmit}
            className="admin-login-form"
          >
            <div className="admin-field">
              <label htmlFor="email">
                Adresse e-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="admin@exemple.fr"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="password">
                Mot de passe
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="admin-login-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              {loading ? (
                "Connexion..."
              ) : (
                <>
                  Se connecter
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="admin-login-bottom">
            <span className="admin-login-security-dot" />
            Accès réservé aux administrateurs
          </div>
        </section>
      </div>
    </main>
  );
}