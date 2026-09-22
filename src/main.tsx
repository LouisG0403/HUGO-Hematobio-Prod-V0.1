import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Element #root introuvable");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        background: "#09070d",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>HUGO HEMATOBIO</h1>

      <p>GitHub Pages fonctionne correctement.</p>

      <p style={{ color: "#8f8f9a" }}>
        Test React réussi.
      </p>
    </div>
  </React.StrictMode>
);