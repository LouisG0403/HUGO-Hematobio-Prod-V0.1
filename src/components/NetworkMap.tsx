import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

type Centre = {
  id: number;
  name: string;
  city: string;
  structure: string | null;
  longitude: string;
  latitude: string;
  description: string | null;
};
import API_URL from "../config/api";

const geoUrl = "/maps/france-regions.geojson";

export default function NetworkMap() {
  const [centres, setCentres] = useState<Centre[]>([]);
  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCentres() {
      try {
        const response = await fetch(`${API_URL}/api/centres`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les centres");
        }

        const data: Centre[] = await response.json();

        setCentres(data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err);
        setError("Impossible de charger le réseau HUGO.");
      } finally {
        setLoading(false);
      }
    }

    fetchCentres();
  }, []);

  /*
   * Position géographique du hub HUGO.
   * Elle sert uniquement de point central du réseau.
   */
  

  return (
  <div className="network-map">

    {/* HUB HUGO */}
    <div className="network-hugo-hub">
      <div className="network-hugo-hub-ring">
        <div className="network-hugo-hub-core">
          <span className="network-hugo-hub-title">
            HUGO
          </span>

          <span className="network-hugo-hub-subtitle">
            HEMATOBIO
          </span>
        </div>
      </div>
    </div>

    {/* CARTE */}
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [-0.2, 47.8],
        scale: 3100,
      }}
      className="network-map-svg"
    >
        {/* ===================================================
            TERRITOIRE FRANÇAIS
        =================================================== */}

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="network-geography"
              />
            ))
          }
        </Geographies>

        {/* ===================================================
            CONNEXIONS HUGO → CHU
        =================================================== */}

        

        {/* ===================================================
            HUB HUGO
        =================================================== */}

        

        {/* ===================================================
            CENTRES HOSPITALIERS
        =================================================== */}

        {!loading &&
          !error &&
          centres.map((centre, index) => (
            <Marker
              key={centre.id}
              coordinates={[
                Number(centre.longitude),
                Number(centre.latitude),
              ]}
            >
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  duration: 0.5,
                }}
                className="network-marker"
                onClick={() => setSelectedCentre(centre)}
              >
                {/* Halo */}
                <circle
                  r={10}
                  className="network-marker-halo"
                />

                {/* Point */}
                <circle
                  r={5}
                  className="network-marker-dot"
                />

                {/* Nom */}
                <text
                  textAnchor="middle"
                  y={-14}
                  className="network-marker-label"
                >
                  {centre.structure
                    ? `${centre.structure} — ${centre.city}`
                    : centre.city}
                </text>
              </motion.g>
            </Marker>
          ))}
      </ComposableMap>

      {/* =====================================================
          CHARGEMENT
      ===================================================== */}

      {loading && (
        <div className="network-loading">
          Chargement du réseau...
        </div>
      )}

      {/* =====================================================
          ERREUR
      ===================================================== */}

      {error && (
        <div className="network-error">
          {error}
        </div>
      )}

      {/* =====================================================
          FICHE CENTRE
      ===================================================== */}

      {selectedCentre && (
        <motion.div
          className="network-centre-info"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            className="network-centre-info-close"
            onClick={() => setSelectedCentre(null)}
            aria-label="Fermer les informations"
          >
            ×
          </button>

          <div className="network-centre-info-structure">
            {selectedCentre.structure || "Centre hospitalier"}
          </div>

          <h3>
            {selectedCentre.name}
          </h3>

          <p className="network-centre-info-city">
            {selectedCentre.city}
          </p>

          {selectedCentre.description && (
            <p className="network-centre-info-description">
              {selectedCentre.description}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}