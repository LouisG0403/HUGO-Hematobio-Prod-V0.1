const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn(
    "VITE_API_URL n'est pas définie. Les appels API risquent de ne pas fonctionner."
  );
}

export default API_URL;