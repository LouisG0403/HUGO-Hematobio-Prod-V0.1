import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Element #root introuvable");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
    <h1>HUGO HEMATOBIO — Chargement...</h1>
    <p>React fonctionne. Chargement de l'application...</p>
  </div>
);

import("./App")
  .then(({ default: App }) => {
    console.log("App chargée avec succès");

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Erreur lors du chargement de App :", error);

    rootElement.innerHTML = `
      <div style="
        padding: 40px;
        font-family: sans-serif;
        color: #b91c1c;
      ">
        <h1>Erreur de chargement de HUGO HEMATOBIO</h1>
        <p>React fonctionne, mais une erreur empêche App de se charger.</p>
        <pre style="
          white-space: pre-wrap;
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        ">${String(error?.stack || error)}</pre>
      </div>
    `;
  });