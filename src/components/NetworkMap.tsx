import { motion } from "framer-motion";

export default function NetworkMap() {
  return (
    <div className="network-map">
      {/* Connexion HUGO → CRTH Rennes */}
      <svg
        className="network-map-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="network-line"
          x1="50"
          y1="50"
          x2="50"
          y2="20"
        />
      </svg>

      {/* Centre HUGO */}
      <motion.div
        className="network-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="network-center-title">
            HUGO
          </div>

          <div className="network-center-subtitle">
            HEMATOBIO
          </div>
        </div>
      </motion.div>

      {/* CRTH Rennes */}
      <motion.button
        type="button"
        className="network-point network-point-rennes"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.5,
        }}
      >
        <motion.div
          className="network-point-halo"
          animate={{
            scale: [0.8, 1.8, 0.8],
            opacity: [0.25, 0, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="network-point-dot" />

        <div className="network-point-label">
          CRTH — CHU de Rennes
        </div>
      </motion.button>
    </div>
  );
}