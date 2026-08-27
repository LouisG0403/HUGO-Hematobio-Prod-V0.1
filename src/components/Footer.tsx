export default function Footer() {
  return (
    <footer className="bg-[#442966] text-white py-12 border-t border-purple-900 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
        
        <p className="text-lg font-bold tracking-wide opacity-90">
          Réseau HUGO HEMATOBIO
        </p>
        
        <p className="text-sm opacity-70 max-w-md mx-auto leading-relaxed">
          GCS HUGO — Hôpitaux Universitaires Grand Ouest. <br />
          Coopération hospitalo-universitaire régionale pour l'innovation en hématologie biologique.
        </p>
        
        <div className="w-16 h-0.5 bg-[#EBBB4E] mx-auto my-4 opacity-60"></div>
        
        <p className="text-xs opacity-50 font-light">
          © {new Date().getFullYear()} Réseau HUGO HEMATOBIO. Tous droits réservés. <br />
          <span className="text-[#EBBB4E]/80">Démo v1 — Couleurs et logo conformes à la charte graphique HUGO</span>
        </p>

      </div>
    </footer>
  );
}