import NetworkMap from "../components/NetworkMap";

export default function Reseau() {
  return (
    <div className="space-y-16">

      {/* =====================================================
          EN-TÊTE
      ===================================================== */}
      <section className="text-center space-y-4">
        <span className="inline-block bg-[#E72D80]/10 border border-[#E72D80]/20 text-[#EBBB4E] text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
          HUGO HEMATOBIO
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Le réseau
        </h1>

        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
          Une coopération hospitalo-universitaire dédiée à la recherche,
          à l'innovation et à la formation en hématologie biologique.
        </p>
      </section>


      {/* =====================================================
          PRÉSENTATION / GOUVERNANCE / PARTENAIRES
      ===================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Présentation */}
        <article className="group relative overflow-hidden bg-[#1E142A]/90 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#442966]/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">

            <div className="w-12 h-12 bg-[#442966]/30 border border-[#442966]/40 rounded-xl flex items-center justify-center text-[#EBBB4E] text-xl mb-6 group-hover:bg-[#442966] transition-colors duration-500">
              🏥
            </div>

            <h2 className="text-xl font-bold text-white mb-3 border-0 p-0">
              Présentation
            </h2>

            <p className="text-white/65 text-sm leading-relaxed">
              Découvrez l'histoire, les objectifs et les missions du réseau
              HUGO HEMATOBIO et son rôle dans la coopération
              hospitalo-universitaire.
            </p>

          </div>
        </article>


        {/* Gouvernance */}
        <article className="group relative overflow-hidden bg-[#1E142A]/90 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E72D80]/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">

            <div className="w-12 h-12 bg-[#E72D80]/10 border border-[#E72D80]/20 rounded-xl flex items-center justify-center text-[#E72D80] text-xl mb-6 group-hover:bg-[#E72D80] group-hover:text-white transition-colors duration-500">
              👥
            </div>

            <h2 className="text-xl font-bold text-white mb-3 border-0 p-0">
              Gouvernance
            </h2>

            <p className="text-white/65 text-sm leading-relaxed">
              Retrouvez les différents acteurs impliqués dans la coordination
              du réseau et son comité de pilotage.
            </p>

          </div>
        </article>


        {/* Partenaires */}
        <article className="group relative overflow-hidden bg-[#1E142A]/90 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#EBBB4E]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">

            <div className="w-12 h-12 bg-[#EBBB4E]/10 border border-[#EBBB4E]/20 rounded-xl flex items-center justify-center text-[#EBBB4E] text-xl mb-6 group-hover:bg-[#EBBB4E] group-hover:text-[#442966] transition-colors duration-500">
              🤝
            </div>

            <h2 className="text-xl font-bold text-white mb-3 border-0 p-0">
              Partenaires
            </h2>

            <p className="text-white/65 text-sm leading-relaxed">
              Découvrez les établissements et organismes associés au réseau
              HUGO HEMATOBIO.
            </p>

          </div>
        </article>

      </section>


      {/* =====================================================
          RÉSEAU TERRITORIAL
      ===================================================== */}
      <section className="bg-[#1E142A]/75 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">

        <div className="text-center mb-8">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E72D80]">
            Implantation territoriale
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 border-0 p-0">
            Un réseau au cœur du Grand Ouest
          </h2>

          <p className="text-white/65 mt-3 max-w-xl mx-auto">
            HUGO HEMATOBIO rassemble plusieurs centres hospitalo-universitaires
            et établissements partenaires autour d'une même dynamique de
            recherche et de soins.
          </p>

        </div>


        {/* Schéma du réseau */}
        <NetworkMap />


        {/* Compteur */}
        <div className="mt-6 flex justify-center">

          <div className="inline-flex items-center gap-3 bg-[#442966]/40 border border-[#442966]/50 rounded-full px-5 py-2">

            <span className="w-2.5 h-2.5 rounded-full bg-[#E72D80] shadow-[0_0_12px_rgba(231,45,128,0.8)]" />

            <span className="text-sm font-semibold text-white/80">
              8 centres membres
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}