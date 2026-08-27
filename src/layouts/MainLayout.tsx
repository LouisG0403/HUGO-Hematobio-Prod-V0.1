import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">

      {/* BACKGROUND ANIMATION LAYER */}
      <div className="bg-animation-container">
        <div className="cellule-anim-1"></div>
        <div className="cellule-anim-2"></div>
        <div className="cellule-anim-3"></div>
        <div className="cellule-anim-4"></div>

        <div className="medical-grid"></div>
        <div className="medical-particles"></div>
      </div>

      {/* CONTENU */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* BANNIÈRE */}
        <div className="bg-gradient-to-r from-[#DD9450] via-[#EBBB4E] to-[#DD9450] text-[#442966] text-center py-2 px-4 text-xs md:text-sm font-bold shadow-sm">
          ⚠️ Démo de travail — version 1 — Contenu provisoire conforme à la charte HUGO
        </div>

        <Header />

        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>

        </main>

        <Footer />

      </div>

    </div>
  );
}