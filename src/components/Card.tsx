import { Link } from "react-router-dom";

// On définit ce que la Card peut recevoir comme informations
interface CardProps {
  title: string;
  description: string;
  icon?: string;       // Optionnel (ex: "🔬")
  tag?: string;        // Optionnel (ex: "Vie du réseau")
  link?: string;       // Optionnel (ex: "/projets")
  linkText?: string;   // Optionnel (ex: "Voir le projet")
}

export default function Card({ title, description, icon, tag, link, linkText }: CardProps) {
  
  // Le design de la carte avec ses animations Tailwind au survol
  const cardContent = (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full text-left bg-gradient-to-b from-white to-gray-50/30">
      
      {/* Affichage du tag si présent */}
      {tag && (
        <span className="self-start bg-purple-50 text-[#442966] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          {tag}
        </span>
      )}

      {/* Affichage de l'icône si présente */}
      {icon && (
        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-[#442966] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-bold text-[#442966] mb-2 group-hover:text-[#E72D80] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
        {description}
      </p>

      {/* Affichage du lien si présent */}
      {link && (
        <span className="text-sm font-semibold text-[#E72D80] inline-flex items-center gap-1 mt-auto group-hover:translate-x-1 transition-transform">
          {linkText || "En savoir plus"} ➜
        </span>
      )}
    </div>
  );

  // Si la carte a un lien, on l'enveloppe dans un composant Link de React Router
  if (link) {
    return (
      <Link to={link} className="block h-full no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}